// Swasthya Sangam - Community & Partner Matchmaking Module
// Map API Integration (Leaflet.js) + Interest Proximity Algorithm

let leafletMapInstance = null;

const CommunityModule = {
  partners: [...COMMUNITY_PARTNERS],

  init() {
    this.refreshCompatibility();
    this.renderPartnersList(this.partners);
    // Initialize map on next animation frame or when tab becomes visible
    setTimeout(() => {
      this.initMap();
    }, 300);
  },

  refreshCompatibility() {
    const userSkills = App.currentUser?.selectedSkills || [];
    this.partners.forEach(partner => {
      const mutual = partner.sports.filter(ps => 
        userSkills.some(us => us.toLowerCase() === ps.toLowerCase())
      );
      const score = Math.min(99, Math.max(70, 70 + (mutual.length * 12)));
      partner.compatibility = `${score}% Match`;
      partner.mutualCount = mutual.length;
    });

    // Sort by compatibility
    this.partners.sort((a, b) => b.mutualCount - a.mutualCount);
  },

  initMap() {
    const mapContainer = document.getElementById("community-map");
    if (!mapContainer) return;

    // Destroy existing instance if already initialized to avoid Leaflet error
    if (leafletMapInstance) {
      leafletMapInstance.remove();
      leafletMapInstance = null;
    }

    // Default center (New Delhi / NCR sports hub)
    const defaultCenter = [28.5600, 77.2100];

    try {
      leafletMapInstance = L.map('community-map', {
        zoomControl: true,
        attributionControl: false
      }).setView(defaultCenter, 13);

      // Dark theme map tiles (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(leafletMapInstance);

      // Add user pin (Current User)
      const userMarker = L.circleMarker(defaultCenter, {
        radius: 9,
        fillColor: '#22c55e',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(leafletMapInstance);

      userMarker.bindPopup(`
        <div style="color: #080c14; font-family: sans-serif; font-size: 13px;">
          <strong style="color: #16a34a;">📍 Your Location</strong><br>
          Ready to workout & play sports!
        </div>
      `).openPopup();

      // Add partner pins
      this.partners.forEach(partner => {
        const partnerMarker = L.marker([partner.lat, partner.lng]).addTo(leafletMapInstance);
        partnerMarker.bindPopup(`
          <div style="color: #080c14; font-family: sans-serif; font-size: 13px; min-width: 160px;">
            <strong>${partner.name} (${partner.age})</strong><br>
            <span style="color: #0284c7; font-weight: bold;">${partner.compatibility}</span><br>
            <small style="color: #555;">${partner.sports.join(", ")}</small><br>
            <button onclick="CommunityModule.connectWithPartner('${partner.id}')" style="margin-top: 6px; padding: 4px 10px; background: #22c55e; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; color: #fff;">Play Together</button>
          </div>
        `);
      });
    } catch (e) {
      console.warn("Leaflet map initialization warning:", e);
    }
  },

  renderPartnersList(list) {
    const container = document.getElementById("partners-grid-container");
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: span 3; padding: 40px;">No matching sports buddies found with this filter. Try expanding your search!</p>`;
      return;
    }

    container.innerHTML = list.map(partner => `
      <div class="partner-card">
        <div>
          <div class="partner-top">
            <img src="${partner.avatar}" alt="${partner.name}" class="partner-avatar">
            <div>
              <h4 style="font-size: 1.05rem; font-weight: 700;">${partner.name}</h4>
              <p style="font-size: 0.78rem; color: var(--text-secondary);">📍 ${partner.location}</p>
              <span class="partner-compat-pill">⚡ ${partner.compatibility}</span>
            </div>
          </div>
          <p style="font-size: 0.86rem; color: var(--text-primary); line-height: 1.45; margin-bottom: 10px;">"${partner.bio}"</p>
          <div class="partner-skills-pills">
            ${partner.sports.map(s => `<span class="skill-tag">🏅 ${s}</span>`).join("")}
          </div>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 14px;">
          <button class="btn btn-primary" style="flex: 1; padding: 8px 12px; font-size: 0.86rem;" onclick="CommunityModule.connectWithPartner('${partner.id}')">
            🤝 Play Together
          </button>
          <button class="btn btn-secondary" style="padding: 8px 14px;" onclick="CommunityModule.viewOnMap(${partner.lat}, ${partner.lng})">
            🗺️ Map
          </button>
        </div>
      </div>
    `).join("");
  },

  connectWithPartner(partnerId) {
    const partner = this.partners.find(p => p.id === partnerId);
    if (!partner) return;

    // Switch to Chat tab and activate chat with this partner
    App.switchTab("chat");
    ChatModule.startOrOpenChat(partner);
  },

  viewOnMap(lat, lng) {
    if (leafletMapInstance) {
      leafletMapInstance.flyTo([lat, lng], 15, { animate: true, duration: 1.2 });
      // Scroll smoothly to map
      const mapElem = document.getElementById("community-map");
      if (mapElem) mapElem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },

  filterBySport(sportName) {
    if (!sportName || sportName === "All") {
      this.renderPartnersList(this.partners);
    } else {
      const filtered = this.partners.filter(p => p.sports.some(s => s.toLowerCase().includes(sportName.toLowerCase())));
      this.renderPartnersList(filtered);
    }
  }
};
