// Swasthya Sangam - Routine Generator Engine
// Specializes in equipment-free bodyweight fitness & personalized workout splits

const RoutineEngine = {
  routinesData: {
    "Calisthenics Strength & Core": {
      weeklySplit: "4-Day Upper/Lower Bodyweight Split",
      days: [
        {
          day: "Day 1: Upper Body Pushing & Core",
          focus: "Chest, Triceps, Anterior Delts, Abs",
          exercises: [
            { name: "Standard / Diamond Pushups", sets: "4 Sets", reps: "12-15 Reps", rest: "60s", note: "Keep elbows at 45 degrees, full lockout at top." },
            { name: "Pike Pushups (Shoulder Press)", sets: "3 Sets", reps: "8-10 Reps", rest: "75s", note: "Elevate feet if ready for handstand progression." },
            { name: "Chair / Bench Dips", sets: "3 Sets", reps: "15 Reps", rest: "60s", note: "Chest up, lower until arms hit 90 degrees." },
            { name: "Hollow Body Hold", sets: "3 Sets", reps: "45 Seconds", rest: "45s", note: "Press lower back firmly into the floor." }
          ]
        },
        {
          day: "Day 2: Lower Body & Explosive Legs",
          focus: "Quads, Glutes, Calves, Ankle Mobility",
          exercises: [
            { name: "Deep Bodyweight Air Squats", sets: "4 Sets", reps: "20 Reps", rest: "60s", note: "Break parallel, drive through whole foot." },
            { name: "Alternating Walking Lunges", sets: "3 Sets", reps: "12 / leg", rest: "60s", note: "Keep torso upright, light knee touch." },
            { name: "Single-Leg Calf Raises", sets: "4 Sets", reps: "20 / leg", rest: "45s", note: "Full stretch at bottom, 2-sec pause at top." },
            { name: "Glute Bridges with 3s Squeeze", sets: "3 Sets", reps: "15 Reps", rest: "45s", note: "Drive through heels, squeeze glutes hard." }
          ]
        },
        {
          day: "Day 3: Active Rest & Yogic Mobility",
          focus: "Spine decompression, Hip Openers, Breathwork",
          exercises: [
            { name: "Surya Namaskar (Sun Salutation)", sets: "5 Rounds", reps: "Continuous flow", rest: "30s", note: "Slow rhythmic breathing." },
            { name: "Cat-Cow & Child's Pose", sets: "3 Sets", reps: "10 Reps each", rest: "30s", note: "Synchronize breath with spine flex." },
            { name: "Anulom Vilom Pranayama", sets: "1 Session", reps: "8 Minutes", rest: "Done", note: "Alternate nostril calming breathwork." }
          ]
        },
        {
          day: "Day 4: Pull & Isometric Core Stability",
          focus: "Back, Biceps, Forearms, Obliques",
          exercises: [
            { name: "Doorframe / Towel Isometric Rows", sets: "4 Sets", reps: "12-15 Reps", rest: "60s", note: "Squeeze shoulder blades firmly." },
            { name: "Superman Back Extensions", sets: "3 Sets", reps: "15 Reps", rest: "45s", note: "Strengthens lumbar spine and posterior chain." },
            { name: "Side Plank Left & Right", sets: "3 Sets", reps: "40s / side", rest: "45s", note: "Maintain straight hip alignment." },
            { name: "Mountain Climbers (HIIT finisher)", sets: "3 Sets", reps: "45 Seconds", rest: "60s", note: "Quick knee drives for cardio boost." }
          ]
        }
      ]
    },
    "Fat Loss & High-Energy HIIT": {
      weeklySplit: "5-Day Metabolic Conditioning & Calorie Torcher",
      days: [
        {
          day: "Day 1: Full Body Calorie Inferno",
          focus: "Cardiovascular VO2 Max & Metabolic Rate",
          exercises: [
            { name: "Jumping Jacks + High Knees", sets: "4 Sets", reps: "60 Seconds", rest: "30s", note: "Light landing on toes, steady breath." },
            { name: "Bodyweight Burpees (No Pushup)", sets: "4 Sets", reps: "12 Reps", rest: "45s", note: "Explosive jump at the finish." },
            { name: "Squat Pulses", sets: "3 Sets", reps: "25 Reps", rest: "45s", note: "Stay in the bottom 3 inches of the squat." },
            { name: "Plank Shoulder Taps", sets: "3 Sets", reps: "20 Total", rest: "45s", note: "Keep hips completely motionless." }
          ]
        },
        {
          day: "Day 2: Core & Lower Body Burner",
          focus: "Abs, Hip Flexors, Hamstrings",
          exercises: [
            { name: "Bicycle Crunches", sets: "4 Sets", reps: "20 / side", rest: "30s", note: "Opposite elbow to knee, slow controlled rotation." },
            { name: "Jump Squats", sets: "3 Sets", reps: "15 Reps", rest: "60s", note: "Soft landing, absorb into squat immediately." },
            { name: "Russian Twists", sets: "3 Sets", reps: "30 Reps", rest: "45s", note: "Elevate feet 2 inches off ground for difficulty." }
          ]
        },
        {
          day: "Day 3: 5KM Outdoor Interval Walk & Run",
          focus: "Aerobic Base & Stamina",
          exercises: [
            { name: "Brisk Walking Warmup", sets: "1 Session", reps: "10 Mins", rest: "0s", note: "Arms swinging rhythmically." },
            { name: "Jog 2 Mins / Walk 1 Min Intervals", sets: "6 Rounds", reps: "18 Mins", rest: "0s", note: "Maintain conversation pace on jog." },
            { name: "Cool-down Quad & Hamstring Stretch", sets: "1 Session", reps: "7 Mins", rest: "Done", note: "Hold each stretch for 30 seconds." }
          ]
        }
      ]
    },
    "Yoga, Mobility & Mental Focus": {
      weeklySplit: "6-Day Holistic Yogic Flow & Flexibility",
      days: [
        {
          day: "Day 1: Spinal Decompression & Morning Flow",
          focus: "Vertebral mobility, neck release, morning vitality",
          exercises: [
            { name: "Surya Namaskar Series A", sets: "6 Rounds", reps: "Breath synced", rest: "30s", note: "Ujjayi pranayama breath throughout." },
            { name: "Trikonasana (Triangle Pose)", sets: "3 Sets", reps: "5 Breaths / side", rest: "30s", note: "Open chest towards the sky." },
            { name: "Bhujangasana (Cobra Pose)", sets: "3 Sets", reps: "20s Hold", rest: "30s", note: "Shoulders drawn away from ears." }
          ]
        },
        {
          day: "Day 2: Deep Hip & Hamstring Release",
          focus: "Pelvic alignment & athletic recovery",
          exercises: [
            { name: "Adho Mukha Svanasana (Downward Dog)", sets: "3 Sets", reps: "1 Min Hold", rest: "30s", note: "Press heels down, hips to ceiling." },
            { name: "Eka Pada Rajakapotasana (Pigeon Pose)", sets: "3 Sets", reps: "45s / side", rest: "30s", note: "Square the hips toward the mat." },
            { name: "Paschimottanasana (Seated Forward Bend)", sets: "3 Sets", reps: "1 Min Hold", rest: "30s", note: "Hinge from the hips, keep back long." }
          ]
        }
      ]
    },
    "Athletic Speed & Agility": {
      weeklySplit: "4-Day Sports Conditioning & Reactive Power",
      days: [
        {
          day: "Day 1: Reactive Footwork & Lateral Acceleration",
          focus: "Multi-directional agility, ankle stiffness, quick change of pace",
          exercises: [
            { name: "Cone / Line Lateral Hops", sets: "4 Sets", reps: "45 Seconds", rest: "45s", note: "Stay on the balls of your feet with rapid ground contact." },
            { name: "Single-Leg Broad Jumps", sets: "4 Sets", reps: "8 / leg", rest: "60s", note: "Stick the landing with balanced soft knee absorption." },
            { name: "Shuttle Run Sprints (5m-10m-15m)", sets: "5 Rounds", reps: "Sprint & Touch", rest: "60s", note: "Low center of gravity on turnarounds." }
          ]
        },
        {
          day: "Day 2: Core Rotational Power & Plyometrics",
          focus: "Torso anti-rotation for sports striking and sprinting",
          exercises: [
            { name: "Tuck Jumps to Deep Squat", sets: "3 Sets", reps: "10 Reps", rest: "60s", note: "Explode upwards, knees to chest." },
            { name: "Plank Dynamic Walkouts", sets: "3 Sets", reps: "12 Reps", rest: "45s", note: "Keep pelvis stabilized." },
            { name: "Standing Broad Jump Burpees", sets: "3 Sets", reps: "10 Reps", rest: "60s", note: "Explosive hip extension into forward leap." }
          ]
        }
      ]
    }
  },

  generate(goal, user) {
    let key = "Calisthenics Strength & Core";
    const g = (goal || "").toLowerCase();
    if (g.includes("fat") || g.includes("weight") || g.includes("hiit")) {
      key = "Fat Loss & High-Energy HIIT";
    } else if (g.includes("yoga") || g.includes("flexibility") || g.includes("mind")) {
      key = "Yoga, Mobility & Mental Focus";
    } else if (g.includes("speed") || g.includes("athletic") || g.includes("agility") || g.includes("sport")) {
      key = "Athletic Speed & Agility";
    }
    const routine = this.routinesData[key] || this.routinesData["Calisthenics Strength & Core"];
    return {
      goalTitle: key,
      generatedFor: user ? user.name : "Athlete",
      bmi: user ? user.bmi : 22.5,
      level: user ? user.level : "Intermediate",
      weeklySplit: routine.weeklySplit,
      days: routine.days
    };
  }
};
