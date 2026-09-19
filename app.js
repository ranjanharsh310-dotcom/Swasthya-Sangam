// Swasthya Sangam - Master Application Controller
// Navigation, State Hydration, Routine Modal, Profile Editing

const App = {
  currentUser: null,
  currentTab: "home",
  activeRoutine: null,
  activeRoutineDayIndex: 0,

  init() {
    // Check if user is logged in
    const loggedIn = ApiService.isLoggedIn();
    if (loggedIn) {
      this.currentUser = ApiService.getUser() || { ...DEFAULT_USER };
    } else {
      // Default to unauthenticated state: show Auth screen immediately
      this.currentUser = { ...DEFAULT_USER };
      setTimeout(() => {
        this.openAuthModal();
      }, 150);
    }

    // Initialize sub-modules
    AuthModule.init();
    DashboardModule.init();
    LearningModule.init();
    ChatModule.init();
    SearchModule.init();

    this.updateUserInterface();
    this.setupNavigation();
    this.setupRoutineModal();
    this.setupProfilePage();

    // Check Spring Boot backend health
    ApiService.checkHealth().then(alive => {
      const statusIndicator = document.getElementById("backend-status-pill");
      if (statusIndicator) {
        statusIndicator.innerHTML = alive 
          ? `<span style="color:#22c55e;">●</span> Spring Boot Online` 
          : `<span style="color:#06b6d4;">●</span> Client Standalone`;
      }
    });
  },

  updateUserInterface() {
    const user = this.currentUser;

    // Sidebar User
    const sbName = document.getElementById("sidebar-user-name");
    const sbLevel = document.getElementById("sidebar-user-level");
    const sbAvatar = document.getElementById("sidebar-user-avatar");

    if (sbName) sbName.textContent = user.name;
    if (sbLevel) sbLevel.textContent = user.level;
    if (sbAvatar) sbAvatar.src = user.avatar;

    // Hero Welcome
    const welcomeName = document.getElementById("welcome-user-name");
    if (welcomeName) welcomeName.textContent = user.name;

    // Profile Page Sync
    this.renderProfileData();
  },

  setupNavigation() {
    // Sidebar Links
    document.querySelectorAll(".sidebar .nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const tab = item.getAttribute("data-tab");
        if (tab) this.switchTab(tab);
      });
    });

    // Mobile Bottom Nav Links
    document.querySelectorAll(".bottom-nav .bottom-nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const tab = item.getAttribute("data-tab");
        if (tab) this.switchTab(tab);
      });
    });
  },

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active nav items (Sidebar)
    document.querySelectorAll(".sidebar .nav-item").forEach(item => {
      if (item.getAttribute("data-tab") === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update active nav items (Bottom Nav)
    document.querySelectorAll(".bottom-nav .bottom-nav-item").forEach(item => {
      if (item.getAttribute("data-tab") === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Hide all screens, show target screen
    document.querySelectorAll(".screen-view").forEach(screen => {
      screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(`screen-${tabName}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Special tab hooks
    if (tabName === "community") {
      CommunityModule.init();
    } else if (tabName === "chat") {
      ChatModule.renderContactsList();
      ChatModule.renderActiveConversation();
    }
  },

  // =========================================================================
  // Personal Fitness Routine Modal
  // =========================================================================
  openRoutineModal() {
    const modal = document.getElementById("routine-modal");
    if (modal) {
      this.generateRoutineForSelectedGoal();
      modal.classList.add("active");
    }
  },

  setupRoutineModal() {
    // Goal selector cards
    document.querySelectorAll(".goal-option-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".goal-option-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const goal = card.getAttribute("data-goal");
        this.currentUser.goal = goal;
        ApiService.saveUser(this.currentUser);
        this.generateRoutineForSelectedGoal();
      });
    });
  },

  generateRoutineForSelectedGoal() {
    const selectedGoal = this.currentUser.goal || "Calisthenics Strength & Core";
    this.activeRoutine = RoutineEngine.generate(selectedGoal, this.currentUser);
    this.activeRoutineDayIndex = 0;
    this.renderRoutineView();
  },

  renderRoutineView() {
    const r = this.activeRoutine;
    if (!r) return;

    // Header info
    const titleElem = document.getElementById("routine-split-title");
    if (titleElem) titleElem.textContent = `🎯 ${r.weeklySplit}`;

    // Day Tabs
    const dayTabsContainer = document.getElementById("routine-day-tabs");
    if (dayTabsContainer) {
      dayTabsContainer.innerHTML = r.days.map((d, idx) => `
        <button class="day-tab-btn ${idx === this.activeRoutineDayIndex ? 'active' : ''}" onclick="App.selectRoutineDay(${idx})">
          ${d.day.split(":")[0]}
        </button>
      `).join("");
    }

    // Active Day Exercises
    const exercisesContainer = document.getElementById("routine-exercises-list");
    const activeDay = r.days[this.activeRoutineDayIndex];

    if (exercisesContainer && activeDay) {
      exercisesContainer.innerHTML = `
        <div style="margin-bottom: 14px; padding: 10px 14px; background: rgba(34, 197, 94, 0.08); border-radius: var(--radius-sm); border: 1px solid rgba(34, 197, 94, 0.2);">
          <strong style="color: var(--neon-green);">${activeDay.day}</strong><br>
          <span style="font-size: 0.82rem; color: var(--text-secondary);">Target: ${activeDay.focus}</span>
        </div>
        ${activeDay.exercises.map((ex, exIdx) => `
          <div class="exercise-item-row" id="ex-row-${exIdx}">
            <div style="flex: 1;">
              <h5 style="font-size: 0.96rem; font-weight: 700; margin-bottom: 4px;">${ex.name}</h5>
              <div style="display: flex; gap: 12px; font-size: 0.82rem; color: var(--electric-cyan);">
                <span>📊 ${ex.sets}</span>
                <span>⚡ ${ex.reps}</span>
                <span>⏱️ Rest: ${ex.rest}</span>
              </div>
              <p style="font-size: 0.76rem; color: var(--text-secondary); margin-top: 4px;">💡 ${ex.note}</p>
            </div>
            <button class="btn btn-secondary" style="padding: 8px 12px; font-size: 0.8rem;" onclick="App.toggleExerciseComplete(${exIdx})">
              Mark Done ✓
            </button>
          </div>
        `).join("")}
      `;
    }
  },

  selectRoutineDay(dayIdx) {
    this.activeRoutineDayIndex = dayIdx;
    this.renderRoutineView();
  },

  toggleExerciseComplete(exIdx) {
    const row = document.getElementById(`ex-row-${exIdx}`);
    if (row) {
      row.classList.toggle("completed");
      if (row.classList.contains("completed")) {
        this.currentUser.xp += 20;
        this.currentUser.workoutMinutes += 5;
        ApiService.saveUser(this.currentUser);
        DashboardModule.renderStreakAndLeaderboard();
        DashboardModule.renderMetrics();
      }
    }
  },

  // =========================================================================
  // Profile Page Management
  // =========================================================================
  setupProfilePage() {
    const profileForm = document.getElementById("profile-edit-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveProfileEdits();
      });
    }
  },

  renderProfileData() {
    const u = this.currentUser;

    // View Fields
    const pName = document.getElementById("profile-view-name");
    const pEmail = document.getElementById("profile-view-email");
    const pAvatar = document.getElementById("profile-view-avatar");
    const pLevel = document.getElementById("profile-view-level");
    const pBmi = document.getElementById("profile-view-bmi");
    const pStreak = document.getElementById("profile-view-streak");
    const pXp = document.getElementById("profile-view-xp");

    if (pName) pName.textContent = u.name;
    if (pEmail) pEmail.textContent = u.email;
    if (pAvatar) pAvatar.src = u.avatar;
    if (pLevel) pLevel.textContent = u.level;
    if (pBmi) pBmi.textContent = u.bmi;
    if (pStreak) pStreak.textContent = `${u.streak} Days`;
    if (pXp) pXp.textContent = `${u.xp} pts`;

    // Form inputs
    const inName = document.getElementById("prof-name");
    const inEmail = document.getElementById("prof-email");
    const inDob = document.getElementById("prof-dob");
    const inAge = document.getElementById("prof-age");
    const inWeight = document.getElementById("prof-weight");
    const inHeight = document.getElementById("prof-height");

    if (inName) inName.value = u.name;
    if (inEmail) inEmail.value = u.email;
    if (inDob) inDob.value = u.dob;
    if (inAge) inAge.value = u.age;
    if (inWeight) inWeight.value = u.weight;
    if (inHeight) inHeight.value = u.height;

    // Render interactive skills tags in Profile
    const skillsContainer = document.getElementById("profile-skills-tags");
    if (skillsContainer) {
      if (u.selectedSkills.length === 0) {
        skillsContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem;">No activities selected yet. Add some below!</span>`;
      } else {
        skillsContainer.innerHTML = u.selectedSkills.map(s => `
          <span class="skill-tag-removeable" onclick="App.removeProfileSkill('${s}')" title="Click to remove">
            🏅 ${s} <span style="font-weight: bold; margin-left: 2px;">✕</span>
          </span>
        `).join("");
      }
    }

    // Render Quick Add suggestions in Profile
    const quickAddContainer = document.getElementById("profile-quick-add-skills");
    if (quickAddContainer) {
      const popularSkills = ["Calisthenics", "Football", "Yoga", "Running", "Badminton", "Cricket", "Basketball", "Swimming", "Pranayama", "Kabaddi"];
      const unselected = popularSkills.filter(s => !u.selectedSkills.includes(s));
      quickAddContainer.innerHTML = unselected.map(s => `
        <span class="skill-pill-select" onclick="App.addProfileSkill('${s}')">
          + ${s}
        </span>
      `).join("");
    }

    // Render Badges in Profile
    const profileBadges = document.getElementById("profile-badges-container");
    if (profileBadges) {
      profileBadges.innerHTML = ApiService.getBadges().map(b => `
        <div class="badge-item ${b.unlocked ? '' : 'locked'}" onclick="DashboardModule.viewBadgeCertificate('${b.id}')">
          <div class="badge-emoji">${b.icon}</div>
          <h5>${b.title}</h5>
          <p>${b.desc}</p>
        </div>
      `).join("");
    }
  },

  removeProfileSkill(skill) {
    this.currentUser.selectedSkills = this.currentUser.selectedSkills.filter(s => s !== skill);
    ApiService.saveUser(this.currentUser);
    this.renderProfileData();
    CommunityModule.filterBySport("All");
  },

  addProfileSkill(skill) {
    if (!this.currentUser.selectedSkills.includes(skill)) {
      this.currentUser.selectedSkills.push(skill);
      ApiService.saveUser(this.currentUser);
      this.renderProfileData();
      CommunityModule.filterBySport("All");
    }
  },

  addProfileCustomSkill() {
    const input = document.getElementById("profile-custom-skill-input");
    if (!input) return;
    const val = input.value.trim();
    if (val) {
      this.addProfileSkill(val);
      input.value = "";
    }
  },

  saveProfileEdits() {
    this.currentUser.name = document.getElementById("prof-name")?.value || this.currentUser.name;
    this.currentUser.email = document.getElementById("prof-email")?.value || this.currentUser.email;
    this.currentUser.dob = document.getElementById("prof-dob")?.value || this.currentUser.dob;
    this.currentUser.age = parseInt(document.getElementById("prof-age")?.value) || this.currentUser.age;
    this.currentUser.weight = parseFloat(document.getElementById("prof-weight")?.value) || this.currentUser.weight;
    this.currentUser.height = parseFloat(document.getElementById("prof-height")?.value) || this.currentUser.height;

    // Recalculate BMI
    this.currentUser.bmi = AuthModule.calculateBMI(this.currentUser.weight, this.currentUser.height);

    ApiService.saveUser(this.currentUser);
    this.updateUserInterface();
    alert("✅ Fitness Profile Updated Successfully!");
  },

  logout() {
    AuthModule.logout();
  },

  openAuthModal() {
    const modal = document.getElementById("auth-overlay-modal");
    if (modal) modal.classList.add("active");
  },

  closeModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
  }
};

// Auto boot on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
