// Swasthya Sangam - Chat & Matchmaking Communication Module
// Real-time peer messaging & quick workout invitation chips

const ChatModule = {
  chats: [],
  activePartnerId: null,

  init() {
    this.chats = ApiService.getChats();
    this.activePartnerId = this.chats[0]?.partnerId || "partner_1";
    this.renderContactsList();
    this.renderActiveConversation();
  },

  renderContactsList() {
    const listContainer = document.getElementById("chat-contacts-list");
    if (!listContainer) return;

    listContainer.innerHTML = this.chats.map(chat => `
      <div class="contact-item ${chat.partnerId === this.activePartnerId ? 'active' : ''}" onclick="ChatModule.switchConversation('${chat.partnerId}')">
        <img src="${chat.avatar}" alt="${chat.partnerName}" class="contact-avatar">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
            <h4 style="font-size: 0.92rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${chat.partnerName}</h4>
            <span style="font-size: 0.7rem; color: var(--neon-green);">${chat.status}</span>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${chat.messages[chat.messages.length - 1]?.text || "Connected on Swasthya"}
          </p>
        </div>
      </div>
    `).join("");
  },

  renderActiveConversation() {
    const activeChat = this.chats.find(c => c.partnerId === this.activePartnerId);
    if (!activeChat) return;

    // Header
    const headerTitle = document.getElementById("chat-active-name");
    const headerStatus = document.getElementById("chat-active-status");
    const headerAvatar = document.getElementById("chat-active-avatar");

    if (headerTitle) headerTitle.textContent = activeChat.partnerName;
    if (headerStatus) headerStatus.textContent = `🎯 ${activeChat.sport} • ${activeChat.status}`;
    if (headerAvatar) headerAvatar.src = activeChat.avatar;

    // Messages
    const msgContainer = document.getElementById("chat-messages-container");
    if (!msgContainer) return;

    msgContainer.innerHTML = activeChat.messages.map(m => `
      <div class="chat-bubble ${m.sender === 'me' ? 'from-me' : 'from-partner'}">
        <p>${m.text}</p>
        <div style="font-size: 0.68rem; opacity: 0.7; text-align: right; margin-top: 4px;">${m.time}</div>
      </div>
    `).join("");

    // Auto-scroll to bottom
    msgContainer.scrollTop = msgContainer.scrollHeight;
  },

  switchConversation(partnerId) {
    this.activePartnerId = partnerId;
    this.renderContactsList();
    this.renderActiveConversation();
  },

  startOrOpenChat(partner) {
    let existing = this.chats.find(c => c.partnerId === partner.id);
    if (!existing) {
      existing = {
        partnerId: partner.id,
        partnerName: partner.name,
        avatar: partner.avatar,
        status: partner.status,
        sport: partner.sports.join(", "),
        messages: [
          {
            id: `m_${Date.now()}`,
            sender: "partner",
            text: `Hey! Excited to connect on Swasthya Sangam. Ready for some ${partner.sports[0]}?`,
            time: "Just now"
          }
        ]
      };
      this.chats.unshift(existing);
      ApiService.saveChats(this.chats);
    }
    this.activePartnerId = partner.id;
    this.renderContactsList();
    this.renderActiveConversation();
  },

  sendMessage(text) {
    if (!text || !text.trim()) return;
    const activeChat = this.chats.find(c => c.partnerId === this.activePartnerId);
    if (!activeChat) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    activeChat.messages.push({
      id: `m_${Date.now()}`,
      sender: "me",
      text: text.trim(),
      time: timeStr
    });

    ApiService.saveChats(this.chats);
    this.renderActiveConversation();
    this.renderContactsList();

    // Auto simulated response after 1.2 seconds
    setTimeout(() => {
      let replyText = "Awesome! Count me in. Let's warm up 10 mins before!";
      if (text.toLowerCase().includes("run")) {
        replyText = "Yes! I'll bring the water bottle and track our 5K pace.";
      } else if (text.toLowerCase().includes("pushup") || text.toLowerCase().includes("calisthenics")) {
        replyText = "Bet! Let's do 4 sets of 25 together at the park.";
      } else if (text.toLowerCase().includes("turf") || text.toLowerCase().includes("football")) {
        replyText = "Perfect! The turf is booked. See you on the pitch!";
      }

      activeChat.messages.push({
        id: `m_rep_${Date.now()}`,
        sender: "partner",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      ApiService.saveChats(this.chats);
      this.renderActiveConversation();
      this.renderContactsList();
    }, 1200);
  },

  sendQuickInvite(inviteType) {
    let inviteText = "";
    switch (inviteType) {
      case "run":
        inviteText = "🏃 Hey, wanna do a 5K sunrise jog at 6:00 AM tomorrow?";
        break;
      case "turf":
        inviteText = "⚽ Turf match at 5:00 PM! We need 1 more player, are you in?";
        break;
      case "pushup":
        inviteText = "💪 100 Pushups Challenge today? Let's check each other's form!";
        break;
      case "yoga":
        inviteText = "🧘 Weekend morning Surya Namaskar & Pranayama session?";
        break;
      default:
        inviteText = "🤝 Free to workout together today?";
    }
    this.sendMessage(inviteText);
  }
};
