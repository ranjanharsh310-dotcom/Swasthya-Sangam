// Swasthya Sangam - API Service Layer
// Bridges Frontend (HTML5/CSS3/JS) with Java Spring Boot REST API
// Graceful fallback to localStorage for fail-safe hackathon presentation

const API_BASE_URL = "http://localhost:8080/api";

const ApiService = {
  isBackendAlive: false,

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: "GET", signal: AbortSignal.timeout(1000) });
      this.isBackendAlive = res.ok;
    } catch (e) {
      this.isBackendAlive = false;
    }
    return this.isBackendAlive;
  },

  // Auth Session State
  isLoggedIn() {
    return localStorage.getItem("swasthya_auth_session") !== null;
  },

  setSession(user) {
    localStorage.setItem("swasthya_auth_session", user.email || "demo@swasthya.in");
    this.saveUser(user);
  },

  clearSession() {
    localStorage.removeItem("swasthya_auth_session");
  },

  // User State Management
  getUser() {
    const saved = localStorage.getItem("swasthya_user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null; // Return null if not yet created/logged in
  },

  saveUser(userData) {
    localStorage.setItem("swasthya_user", JSON.stringify(userData));
    if (this.isBackendAlive) {
      fetch(`${API_BASE_URL}/users/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).catch(() => {});
    }
    return userData;
  },

  // Routine generation
  async generateRoutine(goal, user) {
    if (this.isBackendAlive) {
      try {
        const res = await fetch(`${API_BASE_URL}/routines/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goal, user })
        });
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Falling back to client-side routine engine");
      }
    }
    return RoutineEngine.generate(goal, user);
  },

  // Chat messages
  getChats() {
    const saved = localStorage.getItem("swasthya_chats");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem("swasthya_chats", JSON.stringify(INITIAL_CHATS));
    return [...INITIAL_CHATS];
  },

  saveChats(chats) {
    localStorage.setItem("swasthya_chats", JSON.stringify(chats));
  },

  getTournaments() {
    return TOURNAMENTS;
  },

  getBadges() {
    return BADGES;
  },

  getLeaderboard() {
    return LEADERBOARD_USERS;
  }
};
