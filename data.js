// Swasthya Sangam - Mock Data Store
// Aligned with SIH 2026 Problem Statement 26196

const DEFAULT_USER = {
  id: "user_01",
  name: "Arjun Verma",
  email: "arjun.fitness@swasthya.in",
  dob: "2003-08-15",
  age: 23,
  gender: "Male",
  weight: 70, // kg
  height: 176, // cm
  bmi: 22.6,
  level: "Intermediate Calisthenics",
  streak: 8,
  xp: 1450,
  stepsToday: 7420,
  stepGoal: 10000,
  heartRate: 74,
  caloriesBurned: 520,
  workoutMinutes: 48,
  selectedSkills: ["Calisthenics", "Football", "Yoga", "Running"],
  goal: "Calisthenics Strength & Core Endurance",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
};

const SPORTS_AND_SKILLS = [
  "Calisthenics",
  "Football",
  "Yoga",
  "Running",
  "Badminton",
  "Cricket",
  "Basketball",
  "Swimming",
  "Martial Arts",
  "Cycling",
  "Kabaddi",
  "Pranayama"
];

const LEARNING_CATALOG = [
  {
    id: "learn_1",
    title: "Perfect Pushup Mastery",
    category: "Bodyweight Fitness",
    level: "Beginner to Advanced",
    equipment: "None (Zero Equipment)",
    duration: "10 mins",
    icon: "💪",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80",
    overview: "Pushups build explosive upper body pushing power, sculpting your chest, triceps, anterior deltoids, and engaging core stabilizers.",
    rules: [
      "Keep hands slightly wider than shoulder-width.",
      "Maintain a straight plank line from head to heels (no sagging hips).",
      "Lower until your chest is 2 inches off the ground.",
      "Breathe in on descent, exhale explosively on the press."
    ],
    progressions: ["Wall Pushups", "Knee Pushups", "Standard Pushups", "Diamond Pushups", "Archer Pushups"],
    commonMistakes: "Flaring elbows outward at 90 degrees (keep at 45 degrees), arching lower back."
  },
  {
    id: "learn_2",
    title: "Surya Namaskar (Sun Salutation)",
    category: "Yoga & Mindfulness",
    level: "All Levels",
    equipment: "Yoga Mat or Flat Floor",
    duration: "15 mins",
    icon: "🧘",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=700&q=80",
    overview: "A graceful 12-step sequence of yogic postures synchronized with breath, boosting whole-body flexibility, circulation, and mental clarity.",
    rules: [
      "Synchronize each movement strictly with deep inhalation or exhalation.",
      "Keep the core gently active throughout transitions.",
      "Hold final positions for 2-3 calm breaths if practicing for endurance.",
      "Maintain symmetry on left and right leg extensions."
    ],
    progressions: ["Slow Gentle Pace (3 rounds)", "Standard Flow (6 rounds)", "Dynamic Breathwork (12 rounds)"],
    commonMistakes: "Holding breath during transitions, forcing spine curvature instead of lengthening."
  },
  {
    id: "learn_3",
    title: "Football: Agility, Dribbling & Ball Control",
    category: "Sports Learning",
    level: "Beginner",
    equipment: "Football, 4 markers/shoes",
    duration: "25 mins",
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=700&q=80",
    overview: "Fundamental sports drills to develop quick footwork, low center of gravity, cone weaves, and spatial awareness on the pitch.",
    rules: [
      "Use both inside and outside laces for directional touches.",
      "Keep your head up between touches to scan open space.",
      "Stay on the balls of your feet for reactive agility.",
      "Practice close control before pushing for maximum sprint speed."
    ],
    progressions: ["Stationary Sole Taps", "Figure-8 Cone Slalom", "1v1 Change of Pace Drills"],
    commonMistakes: "Kicking ball too far ahead when sprinting, looking solely down at the ball."
  },
  {
    id: "learn_4",
    title: "Air Squats & Pistol Squat Journey",
    category: "Bodyweight Fitness",
    level: "Intermediate",
    equipment: "None",
    duration: "12 mins",
    icon: "🦵",
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=700&q=80",
    overview: "Unlock bulletproof knees, quadricep hypertrophy, and deep hip mobility through controlled bodyweight squat biomechanics.",
    rules: [
      "Feet shoulder-width apart, toes angled out slightly (15-30 degrees).",
      "Drive hips back first, bending knees while keeping chest upright.",
      "Break parallel (hips slightly lower than knee crease).",
      "Drive through whole foot, keeping knees aligned with toes."
    ],
    progressions: ["Box Squats", "Full Depth Air Squats", "Tempo Pause Squats", "Assisted Pistol Squats", "Single Leg Pistol Squats"],
    commonMistakes: "Knees caving inwards (valgus collapse), lifting heels off the ground."
  },
  {
    id: "learn_5",
    title: "Pranayama & Yogic Breathing",
    category: "Yoga & Mindfulness",
    level: "Beginner",
    equipment: "Calm Space",
    duration: "10 mins",
    icon: "💨",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
    overview: "Ancient Indian respiratory science: Anulom Vilom and Kapalbhati to expand lung capacity, calm cortisol, and boost VO2 max recovery.",
    rules: [
      "Sit in Padmasana or Sukhasana with spine straight.",
      "Use Vishnu mudra on right hand to alternate nostrils.",
      "Inhale for 4 seconds, retain 2 seconds, exhale for 4-6 seconds smoothly.",
      "Avoid strain in the neck or shoulder muscles."
    ],
    progressions: ["Equal Breathing (Sama Vritti)", "Alternate Nostril (Anulom Vilom)", "Shining Skull (Kapalbhati)"],
    commonMistakes: "Forceful chest breathing instead of expanding the diaphragm."
  },
  {
    id: "learn_6",
    title: "Badminton: Footwork & Overhead Clear",
    category: "Sports Learning",
    level: "Beginner to Intermediate",
    equipment: "Racket & Shuttlecock",
    duration: "20 mins",
    icon: "🏸",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80",
    overview: "Learn corner-to-corner split-step footwork and generate whip-like wrist power for deep baseline clears.",
    rules: [
      "Always return to central T-position after striking.",
      "Execute a split-step right when opponent hits the shuttle.",
      "Hit the shuttle at the highest point with arm fully extended.",
      "Follow through diagonally across the torso."
    ],
    progressions: ["Six-Corner Shadow Footwork", "Drop Shot Placement", "High Clears Rally"],
    commonMistakes: "Flat-footed recovery, holding racket with tight hammer grip instead of loose handshake grip."
  }
];

const COMMUNITY_PARTNERS = [
  {
    id: "partner_1",
    name: "Rohan Kulkarni",
    age: 22,
    location: "Green Park Sports Arena (0.8 km away)",
    lat: 28.5585,
    lng: 77.2025,
    sports: ["Football", "Running", "Calisthenics"],
    level: "Intermediate",
    compatibility: "98% Match",
    bio: "Looking for morning football buddies and calisthenics partners at the park bars. Let's hit 100 pushups!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    status: "Active 5m ago"
  },
  {
    id: "partner_2",
    name: "Pooja Sharma",
    age: 21,
    location: "Lotus Temple Grounds (1.4 km away)",
    lat: 28.5535,
    lng: 77.2588,
    sports: ["Yoga", "Pranayama", "Badminton"],
    level: "Advanced",
    compatibility: "94% Match",
    bio: "Certified student yoga practitioner! Conducting weekend sunrise Surya Namaskar & breathing sessions.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    status: "Online"
  },
  {
    id: "partner_3",
    name: "Vikramaditya Rao",
    age: 24,
    location: "University Sports Complex (2.1 km away)",
    lat: 28.5800,
    lng: 77.2150,
    sports: ["Calisthenics", "Football", "Cricket"],
    level: "Elite",
    compatibility: "91% Match",
    bio: "Calisthenics fanatic training for muscle-ups and handstands. Always up for friendly weekend matches.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    status: "Active 1h ago"
  },
  {
    id: "partner_4",
    name: "Sneha Patel",
    age: 23,
    location: "City Central Track (1.9 km away)",
    lat: 28.5670,
    lng: 77.1950,
    sports: ["Running", "Badminton", "Yoga"],
    level: "Intermediate",
    compatibility: "89% Match",
    bio: "Training for the 10K marathon. Looking for weekend pacing partners and friendly badminton games.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    status: "Online"
  }
];

const TOURNAMENTS = [
  {
    id: "tourn_1",
    title: "Fit India Youth Pushup Knockout",
    category: "Calisthenics & Strength",
    organizer: "Fit India Mission & Swasthya Sangam",
    participants: 1240,
    daysLeft: 4,
    prize: "Gold Fitness Pass + Official SIH 2026 E-Certificate",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80",
    description: "Submit your verified 60-second unbroken pushup video or AI live count. Top 10 college athletes enter the national finals!"
  },
  {
    id: "tourn_2",
    title: "Inter-College 7-Day 70,000 Steps League",
    category: "Cardio & Walking",
    organizer: "Ministry of Youth Affairs & Sports",
    participants: 3820,
    daysLeft: 6,
    prize: "Smart Sports Watch & College Trophy",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=700&q=80",
    description: "Form a squad of 4 or participate solo. Average 10,000 steps daily for 7 consecutive days to earn national rank points."
  },
  {
    id: "tourn_3",
    title: "Sunrise 108 Surya Namaskar Challenge",
    category: "Yoga & Mindfulness",
    organizer: "National Yoga Federation",
    participants: 980,
    daysLeft: 2,
    prize: "Yoga Achiever Badge & Ministry Certificate",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80",
    description: "Complete 108 rounds in sets of 12 with rhythmic breathing. Uplift mental stamina and core metabolic health."
  }
];

const LEADERBOARD_USERS = [
  { rank: 1, name: "Aarav 'Iron' Singhania", college: "IIT Delhi", points: 3450, streak: 21, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
  { rank: 2, name: "Devansh Nambiar", college: "NIT Trichy", points: 3120, streak: 18, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80" },
  { rank: 3, name: "Simran Kaur", college: "Panjab University", points: 2980, streak: 15, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" },
  { rank: 4, name: "Arjun Verma (You)", college: "DTU Delhi", points: 1450, streak: 8, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
  { rank: 5, name: "Meera Nair", college: "BITS Pilani", points: 1390, streak: 7, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" }
];

const BADGES = [
  { id: "b1", title: "Early Bird Striker", desc: "Completed 7 morning workouts before 7 AM", icon: "🌅", unlocked: true, date: "12 Sep 2026" },
  { id: "b2", title: "Centurion Pushup", desc: "Hit 100 cumulative pushups in one session", icon: "💯", unlocked: true, date: "14 Sep 2026" },
  { id: "b3", title: "Community Matcher", desc: "Connected with 3 local fitness buddies", icon: "🤝", unlocked: true, date: "16 Sep 2026" },
  { id: "b4", title: "7-Day Streak Master", desc: "Maintained unbroken daily fitness missions", icon: "🔥", unlocked: true, date: "17 Sep 2026" },
  { id: "b5", title: "Marathon 50K Steps", desc: "Logged 50,000 steps within a single week", icon: "🏃", unlocked: false, date: "Locked" },
  { id: "b6", title: "Yoga Sage", desc: "Completed 15 guided Surya Namaskar flows", icon: "🧘", unlocked: false, date: "Locked" }
];

const INITIAL_CHATS = [
  {
    partnerId: "partner_1",
    partnerName: "Rohan Kulkarni",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    status: "Online",
    sport: "Calisthenics & Football",
    messages: [
      { id: "m1", sender: "partner", text: "Hey Arjun! Saw you're also into Calisthenics and Football on Swasthya Sangam.", time: "08:15 AM" },
      { id: "m2", sender: "me", text: "Yo Rohan! Yes bro, training bodyweight routines daily. Green Park bars are near my place.", time: "08:17 AM" },
      { id: "m3", sender: "partner", text: "Awesome! Tomorrow morning 6:30 AM we have a 4v4 turf match. Wanna play together?", time: "08:20 AM" }
    ]
  },
  {
    partnerId: "partner_2",
    partnerName: "Pooja Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    status: "Active 10m ago",
    sport: "Yoga & Pranayama",
    messages: [
      { id: "m10", sender: "partner", text: "Namaste Arjun! Are you joining our Sunday 108 Surya Namaskar challenge?", time: "Yesterday" },
      { id: "m11", sender: "me", text: "Namaste Pooja ji! Yes, planning to join to improve my hip flexibility for sprints.", time: "Yesterday" }
    ]
  }
];
