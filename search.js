// Swasthya Sangam - Search & Discovery Module
// Universal AI-powered search (like Google/Instagram) + local data filter

const SearchModule = {
  currentFilter: "All",
  coachHistory: [],
  _searchDebounce: null,

  init() {
    this.renderSearchResults("");
  },

  handleInput(query) {
    clearTimeout(this._searchDebounce);
    this._searchDebounce = setTimeout(() => {
      this.renderSearchResults(query.toLowerCase().trim());
    }, 500);
  },

  selectChip(chipName, chipElem) {
    document.querySelectorAll(".explore-chip").forEach(c => c.classList.remove("active"));
    if (chipElem) chipElem.classList.add("active");
    this.currentFilter = chipName;
    const searchInput = document.getElementById("main-search-input");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    this.renderSearchResults(query);
  },

  // ───── Main render: shows AI card first, then local results ─────────────
  async renderSearchResults(query) {
    const resultsContainer = document.getElementById("search-results-container");
    if (!resultsContainer) return;

    // If empty query with no chip filter, show default browse
    if (!query && this.currentFilter === "All") {
      this._renderLocalOnly("", resultsContainer);
      return;
    }

    // Show loading spinner while AI fetches
    resultsContainer.innerHTML = `
      <div id="ai-search-loading" style="text-align:center;padding:40px 20px;">
        <div style="display:inline-block;width:40px;height:40px;border:4px solid var(--glass-border);
          border-top-color:var(--neon-green);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        <p style="color:var(--text-secondary);margin-top:14px;font-size:0.92rem;">
          🤖 Searching across all sports & fitness knowledge...
        </p>
      </div>
    `;

    // Fetch AI result (async, non-blocking)
    let aiHtml = "";
    if (query) {
      try {
        if (!GeminiService.isKeyConfigured()) {
          aiHtml = this._renderAIKeyMissingCard(query);
        } else {
          const aiText = await GeminiService.searchQuery(query);
          aiHtml = this._renderAICard(query, aiText);
        }
      } catch (err) {
        aiHtml = this._renderAIErrorCard(query, err.message);
      }
    }

    // Build local results
    const localHtml = this._buildLocalHtml(query);

    // Combine: AI card on top, local results below
    const finalHtml = aiHtml + localHtml;

    resultsContainer.innerHTML = finalHtml || `
      <div style="text-align:center;padding:60px 20px;color:var(--text-secondary);">
        <div style="font-size:3rem;margin-bottom:12px;">🔍</div>
        <h3>No results found for "${query}"</h3>
        <p style="font-size:0.9rem;margin-top:6px;">Try searching for "Pushup", "Basketball", "Yoga", "Football", etc.</p>
      </div>
    `;
  },

  _renderLocalOnly(query, container) {
    const html = this._buildLocalHtml(query);
    container.innerHTML = html || `
      <div style="text-align:center;padding:60px 20px;color:var(--text-secondary);">
        <div style="font-size:3rem;margin-bottom:12px;">🏋️</div>
        <h3>Search any sport or fitness topic</h3>
        <p style="font-size:0.9rem;margin-top:6px;">Try: "Basketball", "HIIT", "Yoga", "Cricket", "Swimming"...</p>
      </div>
    `;
  },

  _buildLocalHtml(query) {
    let learningResults = [...LEARNING_CATALOG];
    let partnerResults = [...COMMUNITY_PARTNERS];
    let tournamentResults = [...TOURNAMENTS];

    // Filter by chip
    if (this.currentFilter !== "All") {
      const f = this.currentFilter.toLowerCase();
      learningResults = learningResults.filter(l =>
        l.category.toLowerCase().includes(f) || l.title.toLowerCase().includes(f)
      );
      partnerResults = partnerResults.filter(p =>
        p.sports.some(s => s.toLowerCase().includes(f))
      );
      tournamentResults = tournamentResults.filter(t =>
        t.category.toLowerCase().includes(f) || t.title.toLowerCase().includes(f)
      );
    }

    // Filter by text
    if (query) {
      learningResults = learningResults.filter(l =>
        l.title.toLowerCase().includes(query) ||
        l.overview.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query)
      );
      partnerResults = partnerResults.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.bio.toLowerCase().includes(query) ||
        p.sports.some(s => s.toLowerCase().includes(query))
      );
      tournamentResults = tournamentResults.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }

    let html = "";

    if (learningResults.length > 0) {
      html += `
        <div style="margin-bottom:28px;">
          <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:14px;color:var(--neon-green);">
            📚 Sports & Fitness Skills (${learningResults.length})
          </h3>
          <div class="learning-grid">
            ${learningResults.map(item => `
              <div class="learning-card" onclick="LearningModule.openDetailModal('${item.id}')">
                <div class="learning-card-img-box">
                  <img src="${item.image}" alt="${item.title}" loading="lazy">
                  <span class="learning-card-tag">${item.category}</span>
                </div>
                <div class="learning-card-content">
                  <h3>${item.icon} ${item.title}</h3>
                  <p>${item.overview}</p>
                  <span style="color:var(--neon-green);font-weight:700;font-size:0.85rem;">View Drills & Rules →</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (partnerResults.length > 0) {
      html += `
        <div style="margin-bottom:28px;">
          <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:14px;color:var(--electric-cyan);">
            🤝 People & Sports Buddies (${partnerResults.length})
          </h3>
          <div class="partners-grid">
            ${partnerResults.map(p => `
              <div class="partner-card">
                <div>
                  <div class="partner-top">
                    <img src="${p.avatar}" alt="${p.name}" class="partner-avatar">
                    <div>
                      <h4 style="font-weight:700;">${p.name}</h4>
                      <p style="font-size:0.78rem;color:var(--text-secondary);">📍 ${p.location}</p>
                      <span class="partner-compat-pill">⚡ ${p.compatibility}</span>
                    </div>
                  </div>
                  <p style="font-size:0.86rem;color:var(--text-primary);margin-bottom:8px;">"${p.bio}"</p>
                  <div class="partner-skills-pills">
                    ${p.sports.map(s => `<span class="skill-tag">🏅 ${s}</span>`).join("")}
                  </div>
                </div>
                <button class="btn btn-primary" style="margin-top:10px;width:100%;font-size:0.86rem;"
                  onclick="CommunityModule.connectWithPartner('${p.id}')">
                  Play Together
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    if (tournamentResults.length > 0) {
      html += `
        <div>
          <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:14px;color:var(--amber-gold);">
            🏆 Tournaments & Challenges (${tournamentResults.length})
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">
            ${tournamentResults.map(t => `
              <div class="tournament-card">
                <div class="tournament-img-box">
                  <img src="${t.image}" alt="${t.title}">
                  <span class="tournament-badge-floating">⏳ ${t.daysLeft} days left</span>
                </div>
                <div class="tournament-body">
                  <h4>${t.title}</h4>
                  <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:10px;">${t.description}</p>
                  <div class="tournament-meta">
                    <span>👥 ${t.participants.toLocaleString()} Joined</span>
                    <span>🎁 ${t.prize}</span>
                  </div>
                  <button class="btn btn-cyan" style="width:100%;padding:8px;"
                    onclick="DashboardModule.joinTournament('${t.id}')">
                    Join Tournament
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    return html;
  },

  // ───── AI Result Card Renderers ──────────────────────────────────────────
  _renderAICard(query, text) {
    // Convert markdown-ish text to HTML
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^#{1,3}\s*(.*)/gm, "<h4 style='color:var(--neon-green);margin:14px 0 6px;font-size:1rem;'>$1</h4>")
      .replace(/^[-•]\s*(.*)/gm, "<li style='margin-bottom:4px;'>$1</li>")
      .replace(/\n\n/g, "</p><p style='margin-bottom:8px;'>")
      .replace(/\n/g, "<br>");

    return `
      <div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(0,212,255,0.06));
        border:1px solid rgba(34,197,94,0.3);border-radius:16px;padding:20px 24px;margin-bottom:28px;position:relative;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
          <span style="font-size:1.4rem;">🤖</span>
          <div>
            <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin:0;">
              AI Knowledge: "${query}"
            </h3>
            <span style="font-size:0.72rem;color:var(--neon-green);font-weight:600;letter-spacing:0.5px;">
              ✨ Powered by Gemini AI • Swasthya Sangam SIH 2026
            </span>
          </div>
        </div>
        <div style="color:var(--text-primary);font-size:0.9rem;line-height:1.7;">
          <p style="margin-bottom:8px;">${formatted}</p>
        </div>
      </div>
    `;
  },

  _renderAIKeyMissingCard(query) {
    return `
      <div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.3);
        border-radius:16px;padding:20px 24px;margin-bottom:28px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span style="font-size:1.4rem;">⚠️</span>
          <h3 style="font-size:1rem;font-weight:700;color:var(--amber-gold);margin:0;">
            AI Search Not Configured
          </h3>
        </div>
        <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.6;">
          Showing local results for <strong>"${query}"</strong>. To enable full internet-wide AI search:
        </p>
        <ol style="color:var(--text-secondary);font-size:0.85rem;margin:10px 0 0 18px;line-height:1.8;">
          <li>Go to <strong>aistudio.google.com</strong> → Get API Key</li>
          <li>Copy your key (starts with <code style="color:var(--neon-green);">AIza...</code>)</li>
          <li>Open <code>js/gemini.js</code> → replace <code>GEMINI_API_KEY</code> value</li>
        </ol>
      </div>
    `;
  },

  _renderAIErrorCard(query, errorMsg) {
    return `
      <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);
        border-radius:16px;padding:16px 20px;margin-bottom:28px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.3rem;">❌</span>
          <div>
            <h4 style="color:#ef4444;margin:0;font-size:0.95rem;">AI Search Unavailable</h4>
            <p style="color:var(--text-secondary);font-size:0.82rem;margin:4px 0 0;">
              ${errorMsg.includes("GEMINI_KEY_NOT_SET")
                ? "API key not configured. Showing local results only."
                : `API error: ${errorMsg}. Check your key at aistudio.google.com.`}
            </p>
          </div>
        </div>
      </div>
    `;
  }
};
