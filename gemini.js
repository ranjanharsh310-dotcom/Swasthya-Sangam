// Swasthya Sangam - Gemini AI Service
// Powers universal search & AI fitness coach using Google Gemini API
// Replace GEMINI_API_KEY with your valid key from: https://aistudio.google.com
// Valid Gemini keys start with "AIza..."

const GeminiService = {
  // Replace this with your real AIza... key from aistudio.google.com
  GEMINI_API_KEY: "AQ.Ab8RN6KHmn1kAr2mrZ3RCxkY2Opc-56XQZXQGTm1GwfLlxTHRw",

  BASE_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",

  isKeyConfigured() {
    return (
      this.GEMINI_API_KEY &&
      (this.GEMINI_API_KEY.startsWith("AIza") || this.GEMINI_API_KEY.startsWith("AQ.")) &&
      this.GEMINI_API_KEY !== "___ALREADY_REPLACED___"
    );
  },

  async ask(prompt) {
    if (!this.isKeyConfigured()) {
      throw new Error("GEMINI_KEY_NOT_SET");
    }

    const endpoint = `${this.BASE_URL}?key=${this.GEMINI_API_KEY}`;

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `HTTP ${response.status}`;
      throw new Error(msg);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from Gemini.");
    return text;
  },

  // SEARCH: generates structured fitness/sports knowledge card
  async searchQuery(query) {
    const prompt = `You are an expert fitness trainer, sports coach, and health advisor for "Swasthya Sangam" — an Indian youth fitness platform for SIH 2026.

User searched for: "${query}"

Provide a helpful, structured, and engaging response with these EXACT sections (use emojis as shown):

Overview
(2-3 sentences explaining what this sport/exercise/topic is)

Key Techniques
(3-4 bullet points with the most important techniques or skills)

Beginner Tips
(3 practical tips for someone just starting)

Equipment-Free Practice
(How to practice this without any equipment — bodyweight methods, home-friendly drills)

Safety and Injury Prevention
(2-3 important safety points)

Indian Context
(Any specific Indian platforms, academies, coaches, or cultural relevance)

Keep your response motivating, youth-focused, and practical. Use simple English. Add emojis to section headers.`;

    return await this.ask(prompt);
  },

  // AI COACH: conversational fitness assistant
  async coachChat(userMessage, conversationHistory) {
    const history = conversationHistory || [];
    const systemContext = `You are "FitBot", an enthusiastic AI Fitness Coach for Swasthya Sangam — an Indian youth sports and fitness platform (SIH 2026).

Your persona:
- Expert in bodyweight fitness, calisthenics, sports science, nutrition, and Indian sports
- Motivational but practical — give real, actionable advice
- Use Indian context: mention dals, paneer, curd, sattu; reference Indian sports like kabaddi, kho-kho, etc.
- Keep responses SHORT and punchy (max 3-4 sentences). Add 1-2 relevant emojis.
- Never recommend expensive equipment; focus on zero-equipment or household alternatives.`;

    const historyText = history
      .slice(-6)
      .map(function(m) { return (m.role === "user" ? "User" : "FitBot") + ": " + m.text; })
      .join("\n");

    const prompt = systemContext + "\n\n" + (historyText ? "Previous conversation:\n" + historyText + "\n" : "") + "User: " + userMessage + "\nFitBot:";

    return await this.ask(prompt);
  }
};

