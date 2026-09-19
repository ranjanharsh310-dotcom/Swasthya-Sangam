// Swasthya Sangam - Learning & Sports Mastery Module
// Equipment-free bodyweight exercises, sports techniques & yoga forms

const LearningModule = {
  catalog: [...LEARNING_CATALOG],

  init() {
    this.renderCards(this.catalog);
  },

  renderCards(items) {
    const container = document.getElementById("learning-grid-container");
    if (!container) return;

    container.innerHTML = items.map(item => `
      <div class="learning-card" onclick="LearningModule.openDetailModal('${item.id}')">
        <div class="learning-card-img-box">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span class="learning-card-tag">${item.category}</span>
        </div>
        <div class="learning-card-content">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.76rem; color: var(--neon-green); font-weight: 700;">${item.level}</span>
            <span style="font-size: 0.74rem; color: var(--text-secondary);">⏱️ ${item.duration}</span>
          </div>
          <h3>${item.icon} ${item.title}</h3>
          <p>${item.overview}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-light);">
            <span style="font-size: 0.78rem; color: var(--text-secondary);">🛠️ ${item.equipment}</span>
            <span style="color: var(--neon-green); font-weight: 700; font-size: 0.85rem;">Learn Rules →</span>
          </div>
        </div>
      </div>
    `).join("");
  },

  filterCategory(category, buttonElem) {
    // Update active button state
    document.querySelectorAll(".learning-filter-btn").forEach(btn => btn.classList.remove("active"));
    if (buttonElem) buttonElem.classList.add("active");

    if (category === "All") {
      this.renderCards(this.catalog);
    } else {
      const filtered = this.catalog.filter(i => i.category === category);
      this.renderCards(filtered);
    }
  },

  openDetailModal(itemId) {
    const item = this.catalog.find(i => i.id === itemId);
    if (!item) return;

    const modal = document.getElementById("learning-modal");
    const body = document.getElementById("learning-modal-body");
    const title = document.getElementById("learning-modal-title");

    title.innerHTML = `${item.icon} ${item.title}`;

    body.innerHTML = `
      <div style="margin-bottom: 20px;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 240px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
      </div>
      
      <div style="display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
        <span class="skill-tag" style="background: rgba(34, 197, 94, 0.15); color: var(--neon-green); border: 1px solid rgba(34, 197, 94, 0.3);">📌 ${item.category}</span>
        <span class="skill-tag">🎯 Level: ${item.level}</span>
        <span class="skill-tag">⏱️ Est. Session: ${item.duration}</span>
        <span class="skill-tag">🛠️ Equipment: ${item.equipment}</span>
      </div>

      <div style="margin-bottom: 22px;">
        <h4 style="color: var(--neon-green); font-size: 1.05rem; margin-bottom: 8px;">📖 Overview & Science</h4>
        <p style="color: var(--text-primary); line-height: 1.6; font-size: 0.92rem;">${item.overview}</p>
      </div>

      <div style="margin-bottom: 22px;">
        <h4 style="color: var(--electric-cyan); font-size: 1.05rem; margin-bottom: 10px;">📋 Execution Rules & Proper Technique</h4>
        <ul style="padding-left: 20px; color: var(--text-primary); line-height: 1.8; font-size: 0.92rem;">
          ${item.rules.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>

      <div style="margin-bottom: 22px;">
        <h4 style="color: var(--amber-gold); font-size: 1.05rem; margin-bottom: 8px;">🪜 Step-by-Step Progressions</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${item.progressions.map((p, idx) => `
            <span style="padding: 6px 12px; border-radius: 6px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-light); font-size: 0.85rem;">
              Step ${idx + 1}: <strong>${p}</strong>
            </span>
          `).join("")}
        </div>
      </div>

      <div style="padding: 14px 18px; border-radius: var(--radius-md); background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25);">
        <strong style="color: var(--crimson-red); display: block; margin-bottom: 4px;">⚠️ Common Mistakes to Avoid:</strong>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">${item.commonMistakes}</p>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <button class="btn btn-primary" style="width: 100%; padding: 12px;" onclick="LearningModule.practiceNow('${item.title}')">
          🚀 Add to Today's Routine
        </button>
      </div>
    `;

    modal.classList.add("active");
  },

  practiceNow(title) {
    App.closeModals();
    App.openRoutineModal();
  }
};
