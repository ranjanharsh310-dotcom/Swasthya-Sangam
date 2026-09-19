// Swasthya Sangam - Authentication & Onboarding Module
// Multi-step signup: Basic credentials -> Physiological metrics -> Interactive Sports & Hobbies Selection

const AuthModule = {
  currentTab: "signup", // 'login' or 'signup'
  currentStep: 1,
  selectedSkills: ["Calisthenics", "Football", "Yoga"],

  availableSkillCategories: {
    "Team Sports": ["Football", "Cricket", "Basketball", "Volleyball", "Kabaddi"],
    "Racket & Individual": ["Badminton", "Table Tennis", "Running", "Cycling", "Swimming"],
    "Bodyweight Fitness": ["Calisthenics", "Pushups & Dips", "HIIT Conditioning", "Core Mastery"],
    "Yoga & Wellness": ["Surya Namaskar", "Hatha Yoga", "Pranayama Breathwork", "Meditation"]
  },

  init() {
    this.renderSkillsCategories();
    this.setupListeners();
  },

  switchAuthTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll(".auth-tab-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`auth-tab-${tab}`);
    if (activeBtn) activeBtn.classList.add("active");

    const loginSection = document.getElementById("auth-login-section");
    const signupSection = document.getElementById("auth-signup-section");

    if (tab === "login") {
      if (loginSection) loginSection.style.display = "block";
      if (signupSection) signupSection.style.display = "none";
    } else {
      if (loginSection) loginSection.style.display = "none";
      if (signupSection) signupSection.style.display = "block";
      this.goToStep(1);
    }
  },

  goToStep(stepNumber) {
    this.currentStep = stepNumber;
    document.querySelectorAll(".signup-step-page").forEach(p => p.style.display = "none");
    const target = document.getElementById(`signup-step-${stepNumber}`);
    if (target) target.style.display = "block";

    // Update step indicator
    document.querySelectorAll(".step-indicator-dot").forEach((dot, idx) => {
      if (idx + 1 === stepNumber) {
        dot.classList.add("active");
      } else if (idx + 1 < stepNumber) {
        dot.classList.add("completed");
        dot.classList.remove("active");
      } else {
        dot.classList.remove("active", "completed");
      }
    });

    if (stepNumber === 2) {
      this.updateLiveBMI();
    }
  },

  renderSkillsCategories() {
    const container = document.getElementById("onboarding-skills-list");
    if (!container) return;

    let html = "";
    for (const [category, skills] of Object.entries(this.availableSkillCategories)) {
      html += `
        <div style="margin-bottom: 12px; width: 100%;">
          <div style="font-size: 0.76rem; color: var(--electric-cyan); font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">
            ${category}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${skills.map(skill => {
              const isSelected = this.selectedSkills.includes(skill);
              return `
                <span class="skill-pill-select ${isSelected ? 'selected' : ''}" onclick="AuthModule.toggleSkill('${skill}', this)">
                  ${isSelected ? '✓ ' : '+ '}${skill}
                </span>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    this.updateSelectedCounter();
  },

  toggleSkill(skill, elem) {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
      if (elem) {
        elem.classList.remove("selected");
        elem.textContent = `+ ${skill}`;
      }
    } else {
      this.selectedSkills.push(skill);
      if (elem) {
        elem.classList.add("selected");
        elem.textContent = `✓ ${skill}`;
      }
    }
    this.updateSelectedCounter();
  },

  addCustomSkill() {
    const input = document.getElementById("custom-skill-input");
    if (!input) return;
    const value = input.value.trim();
    if (!value) return;

    if (!this.selectedSkills.includes(value)) {
      this.selectedSkills.push(value);
      // Also add to custom list if not present
      if (!this.availableSkillCategories["Other / Custom"]) {
        this.availableSkillCategories["Other / Custom"] = [];
      }
      this.availableSkillCategories["Other / Custom"].push(value);
      this.renderSkillsCategories();
    }
    input.value = "";
  },

  updateSelectedCounter() {
    const counter = document.getElementById("selected-skills-count");
    if (counter) {
      counter.textContent = `${this.selectedSkills.length} selected`;
    }
  },

  calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm) return 22.0;
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  },

  updateLiveBMI() {
    const w = parseFloat(document.getElementById("onboard-weight")?.value) || 70;
    const h = parseFloat(document.getElementById("onboard-height")?.value) || 176;
    const bmi = this.calculateBMI(w, h);

    const bmiDisplay = document.getElementById("onboard-live-bmi");
    if (bmiDisplay) {
      let status = "Healthy Weight";
      let color = "#22c55e";
      if (bmi < 18.5) { status = "Underweight"; color = "#06b6d4"; }
      else if (bmi >= 25 && bmi < 30) { status = "Overweight"; color = "#f59e0b"; }
      else if (bmi >= 30) { status = "Obese"; color = "#ef4444"; }

      bmiDisplay.innerHTML = `BMI: <strong>${bmi}</strong> (<span style="color:${color}">${status}</span>)`;
    }
  },

  // Handlers
  handleStep1Submit(e) {
    e.preventDefault();
    this.goToStep(2);
  },

  handleStep2Submit(e) {
    e.preventDefault();
    this.goToStep(3);
  },

  handleStep3Submit(e) {
    e.preventDefault();

    if (this.selectedSkills.length === 0) {
      alert("Please select at least 1 sport or fitness activity!");
      return;
    }

    const name = document.getElementById("auth-name")?.value || "New Athlete";
    const email = document.getElementById("auth-email")?.value || "athlete@swasthya.in";
    const dob = document.getElementById("onboard-dob")?.value || "2004-01-01";
    const age = parseInt(document.getElementById("onboard-age")?.value) || 22;
    const gender = document.getElementById("onboard-gender")?.value || "Male";
    const weight = parseFloat(document.getElementById("onboard-weight")?.value) || 70;
    const height = parseFloat(document.getElementById("onboard-height")?.value) || 176;
    const goal = document.getElementById("onboard-primary-goal")?.value || "Calisthenics Strength & Core";

    const bmi = this.calculateBMI(weight, height);

    const newUser = {
      id: "user_" + Date.now(),
      name,
      email,
      dob,
      age,
      gender,
      weight,
      height,
      bmi,
      level: "Student Athlete",
      streak: 1,
      xp: 100,
      stepsToday: 1200,
      stepGoal: 10000,
      heartRate: 72,
      caloriesBurned: 110,
      workoutMinutes: 15,
      selectedSkills: [...this.selectedSkills],
      goal,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
    };

    ApiService.setSession(newUser);
    this.finishAuth(newUser);
  },

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("login-email")?.value;
    
    // Check if an existing saved user matches, otherwise log in with Demo User
    let user = ApiService.getUser();
    if (!user || user.email !== email) {
      user = { ...DEFAULT_USER };
      if (email) user.email = email;
    }

    ApiService.setSession(user);
    this.finishAuth(user);
  },

  quickDemoLogin() {
    const demoUser = { ...DEFAULT_USER };
    ApiService.setSession(demoUser);
    this.finishAuth(demoUser);
  },

  finishAuth(user) {
    const overlay = document.getElementById("auth-overlay-modal");
    if (overlay) overlay.classList.remove("active");

    App.currentUser = user;
    App.updateUserInterface();
    DashboardModule.init();
    CommunityModule.init();
    App.switchTab("home");
  },

  logout() {
    if (confirm("Are you sure you want to log out of Swasthya Sangam?")) {
      ApiService.clearSession();
      // Show Auth Overlay
      const overlay = document.getElementById("auth-overlay-modal");
      if (overlay) overlay.classList.add("active");

      // Reset to Login tab or fresh register
      this.switchAuthTab("login");
    }
  },

  setupListeners() {
    const step1Form = document.getElementById("auth-form-step1");
    if (step1Form) step1Form.addEventListener("submit", (e) => this.handleStep1Submit(e));

    const step2Form = document.getElementById("auth-form-step2");
    if (step2Form) step2Form.addEventListener("submit", (e) => this.handleStep2Submit(e));

    const step3Form = document.getElementById("auth-form-step3");
    if (step3Form) step3Form.addEventListener("submit", (e) => this.handleStep3Submit(e));

    const loginForm = document.getElementById("auth-login-form");
    if (loginForm) loginForm.addEventListener("submit", (e) => this.handleLoginSubmit(e));

    // Live BMI update listeners
    const wInput = document.getElementById("onboard-weight");
    const hInput = document.getElementById("onboard-height");
    if (wInput) wInput.addEventListener("input", () => this.updateLiveBMI());
    if (hInput) hInput.addEventListener("input", () => this.updateLiveBMI());
  }
};
