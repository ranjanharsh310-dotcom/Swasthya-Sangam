// Swasthya Sangam - Dashboard, Gamification & AI Coach Module
// Step progress circle, streak system, leaderboard podium, badges, and AI chatbot

const DashboardModule = {
  init() {
    this.renderStepsRing();
    this.renderMetrics();
    this.renderStreakAndLeaderboard();
    this.renderTournaments();
    this.renderBadges();
    this.setupAICoach();
  },

  renderStepsRing() {
    const user = App.currentUser;
    const circle = document.getElementById("step-progress-svg-circle");
    const countText = document.getElementById("dashboard-step-count");
    const goalText = document.getElementById("dashboard-step-goal");

    if (!circle || !countText) return;

    countText.textContent = user.stepsToday.toLocaleString();
    if (goalText) goalText.textContent = `Goal: ${user.stepGoal.toLocaleString()} steps`;

    const circumference = 565.48; // 2 * pi * 90
    const fraction = Math.min(user.stepsToday / user.stepGoal, 1);
    const offset = circumference - (fraction * circumference);

    // Smooth animation
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 100);
  },

  addQuickSteps(amount = 500) {
    App.currentUser.stepsToday += amount;
    App.currentUser.caloriesBurned += Math.round(amount * 0.045);
    ApiService.saveUser(App.currentUser);
    this.renderStepsRing();
    this.renderMetrics();

    // Check if goal reached for badge unlock
    if (App.currentUser.stepsToday >= App.currentUser.stepGoal) {
      this.triggerAchievementPopup("🎉 Goal Achieved!", `You surpassed ${App.currentUser.stepGoal} steps today! +100 XP awarded.`);
      App.currentUser.xp += 100;
      ApiService.saveUser(App.currentUser);
      this.renderStreakAndLeaderboard();
    }
  },

  renderMetrics() {
    const user = App.currentUser;
    const hr = document.getElementById("metric-heart-rate");
    const cal = document.getElementById("metric-calories");
    const time = document.getElementById("metric-time");

    if (hr) hr.textContent = `${user.heartRate} BPM`;
    if (cal) cal.textContent = `${user.caloriesBurned} kcal`;
    if (time) time.textContent = `${user.workoutMinutes} mins`;
  },

  renderStreakAndLeaderboard() {
    const user = App.currentUser;

    // Streak and XP
    const streakDisplay = document.getElementById("dashboard-streak-count");
    const xpDisplay = document.getElementById("dashboard-xp-count");

    if (streakDisplay) streakDisplay.textContent = `${user.streak} Days Streak 🔥`;
    if (xpDisplay) xpDisplay.textContent = `${user.xp} XP`;

    // Leaderboard
    const list = document.getElementById("leaderboard-list-container");
    if (!list) return;

    const leaders = ApiService.getLeaderboard();

    list.innerHTML = leaders.map(u => {
      let rankClass = "";
      if (u.rank === 1) rankClass = "gold";
      else if (u.rank === 2) rankClass = "silver";
      else if (u.rank === 3) rankClass = "bronze";

      const isSelf = u.name.includes("You");

      return `
        <div class="leaderboard-row ${isSelf ? 'highlight-self' : ''}">
          <span class="leader-rank ${rankClass}">#${u.rank}</span>
          <div class="leader-user-info">
            <img src="${u.avatar}" alt="${u.name}" class="leader-avatar">
            <div>
              <div class="leader-name">${u.name}</div>
              <div class="leader-college">🏫 ${u.college} • 🔥 ${u.streak}d streak</div>
            </div>
          </div>
          <div class="leader-points">${u.points} XP</div>
        </div>
      `;
    }).join("");
  },

  renderTournaments() {
    const container = document.getElementById("dashboard-tournaments-container");
    if (!container) return;

    const tournaments = ApiService.getTournaments();

    container.innerHTML = tournaments.map(t => `
      <div class="tournament-card">
        <div class="tournament-img-box">
          <img src="${t.image}" alt="${t.title}">
          <span class="tournament-badge-floating">⏳ ${t.daysLeft}d left</span>
        </div>
        <div class="tournament-body">
          <h4>${t.title}</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;">${t.description}</p>
          <div class="tournament-meta">
            <span>👥 ${t.participants.toLocaleString()} Athletes</span>
            <span>🎁 ${t.prize}</span>
          </div>
          <button class="btn btn-primary" style="width: 100%; padding: 8px 14px; font-size: 0.85rem;" onclick="DashboardModule.joinTournament('${t.id}')">
            🏆 Register / Join Challenge
          </button>
        </div>
      </div>
    `).join("");
  },

  joinTournament(id) {
    const tourn = TOURNAMENTS.find(t => t.id === id);
    if (!tourn) return;

    this.triggerAchievementPopup("🏆 Tournament Joined!", `You are now enrolled in '${tourn.title}'. Log daily missions to climb the national leaderboard!`);
    App.currentUser.xp += 50;
    ApiService.saveUser(App.currentUser);
    this.renderStreakAndLeaderboard();
  },

  renderBadges() {
    const container = document.getElementById("dashboard-badges-container");
    if (!container) return;

    const badges = ApiService.getBadges();

    container.innerHTML = badges.map(b => `
      <div class="badge-item ${b.unlocked ? '' : 'locked'}" onclick="DashboardModule.viewBadgeCertificate('${b.id}')">
        <div class="badge-emoji">${b.icon}</div>
        <h5>${b.title}</h5>
        <p>${b.desc}</p>
        <span style="font-size: 0.7rem; color: ${b.unlocked ? 'var(--neon-green)' : 'var(--text-muted)'}; margin-top: 6px; font-weight: 700;">
          ${b.unlocked ? '🏅 Verified Milestone' : '🔒 Locked'}
        </span>
      </div>
    `).join("");
  },

  viewBadgeCertificate(badgeId) {
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge || !badge.unlocked) return;

    const modal = document.getElementById("certificate-modal");
    const certName = document.getElementById("cert-user-name");
    const certTitle = document.getElementById("cert-badge-title");
    const certDesc = document.getElementById("cert-badge-desc");
    const certDate = document.getElementById("cert-date");

    if (certName) certName.textContent = App.currentUser.name;
    if (certTitle) certTitle.textContent = badge.title;
    if (certDesc) certDesc.textContent = `In recognition of achieving outstanding performance: "${badge.desc}" through consistent discipline on Swasthya Sangam.`;
    if (certDate) certDate.textContent = `Issued on: ${badge.date} • Verified by Fit India & SIH 2026`;

    modal.classList.add("active");
  },

  triggerAchievementPopup(title, msg) {
    alert(`${title}\n\n${msg}`);
  },

  // AI Fitness Coach Floating Assistant
  coachHistory: [],

  setupAICoach() {
    const sendBtn = document.getElementById("ai-coach-send-btn");
    const input = document.getElementById("ai-coach-input");

    if (sendBtn && input) {
      sendBtn.onclick = () => this.handleCoachMessage();
      input.onkeypress = (e) => {
        if (e.key === 'Enter') this.handleCoachMessage();
      };
    }
  },

  toggleAICoachWindow() {
    const win = document.getElementById("ai-coach-window");
    if (win) win.classList.toggle("open");
  },

  async handleCoachMessage() {
    const input = document.getElementById("ai-coach-input");
    const sendBtn = document.getElementById("ai-coach-send-btn");
    const text = input.value.trim();
    if (!text) return;

    input.value = "";
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;

    this.appendCoachMessage("user", text);

    const typingId = "typing-" + Date.now();
    this.appendCoachMessage("bot-typing", "...", typingId);

    try {
      let botResponse;

      if (typeof GeminiService !== "undefined" && GeminiService.isKeyConfigured()) {
        botResponse = await GeminiService.coachChat(text, this.coachHistory);
        this.coachHistory.push({ role: "user", text: text });
        this.coachHistory.push({ role: "bot", text: botResponse });
        if (this.coachHistory.length > 20) this.coachHistory = this.coachHistory.slice(-20);
      } else {
        await new Promise(r => setTimeout(r, 700));
        const lower = text.toLowerCase();
        if (lower.includes("pushup") || lower.includes("chest")) {
          botResponse = "For pushups: hands just outside shoulder width, elbows at 45 degrees, core locked. Start with incline pushups if regular ones feel hard! 💪";
        } else if (lower.includes("diet") || lower.includes("food") || lower.includes("protein")) {
          botResponse = "Best natural Indian proteins: sattu, paneer, moong dal, curd, sprouted legumes. Banana + curd 30 mins before workout = great energy! 🍌";
        } else if (lower.includes("fat") || lower.includes("weight loss")) {
          botResponse = "20-min daily HIIT (burpees + air squats + mountain climbers) + 8,000 steps/day. No gym needed! 🔥";
        } else if (lower.includes("yoga") || lower.includes("stretch")) {
          botResponse = "12 rounds of Surya Namaskar at sunrise + Anulom Vilom. Try it for 21 days for flexibility and lung capacity! 🧘";
        } else if (lower.includes("basketball") || lower.includes("football") || lower.includes("cricket")) {
          botResponse = "Great sport! Use the Search tab to explore detailed drills and techniques for any sport. I can give you specific tips anytime! 🏀";
        } else if (lower.includes("sih") || lower.includes("swasthya")) {
          botResponse = "Swasthya Sangam empowers Indian youth with zero-equipment fitness, gamified challenges, and sports matchmaking! Proud SIH 2026 project 🇮🇳";
        } else {
          botResponse = "Consistency beats intensity — workout 4-5x/week, sleep 7-8 hrs, stay hydrated. Add a Gemini API key for smarter AI answers! 💡";
        }
      }

      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      this.appendCoachMessage("bot", botResponse);

    } catch (err) {
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      this.appendCoachMessage("bot", "AI is having a moment! Check your Gemini API key or try again. Meanwhile, Search tab has full sports knowledge 🏋️");
    } finally {
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
    }
  },

  appendCoachMessage(sender, text, id) {
    const container = document.getElementById("ai-coach-messages-list");
    if (!container) return;

    const div = document.createElement("div");
    if (id) div.id = id;

    if (sender === "bot-typing") {
      div.className = "bot-msg";
      div.innerHTML = `<span style="letter-spacing:3px;opacity:0.5;">● ● ●</span>`;
    } else {
      div.className = sender === "user" ? "user-msg" : "bot-msg";
      div.textContent = text;
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }
};
