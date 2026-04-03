# ⚡ Self Upgrade System

A **habit tracker + RPG-lite** life dashboard built with **Vanilla JavaScript** and **Local Storage** — no backend, no build tools, no frameworks.

## ✨ Features

| Feature | Description |
|---|---|
| **Quest System** | Add/complete/remove quests (3–5 limit). Normal, Hard, Legend, Custom types. |
| **EXP & Level** | Gain EXP on quest completion. Level up automatically. Streak bonuses. |
| **Stats** | Physical, Mind, Focus — each raised by matching quest category. |
| **Streak Tracking** | Daily streak counter. Validates on load and resets if a day is missed. |
| **Achievements** | 11 achievements unlocked automatically by in-game milestones. |
| **Persistence** | All data saved to Local Storage (JSON). Works offline. |

## 📁 Folder Structure

```
Self-upgrade-system-/
├── index.html
├── css/
│   ├── main.css          # Global resets, buttons, form, notifications
│   ├── dashboard.css     # Layout, cards, quests, stats, achievements
│   └── theme.css         # CSS custom properties (dark glassmorphism palette)
├── js/
│   ├── main.js           # App entry point — wires UI callbacks, bootstraps state
│   ├── models/
│   │   ├── Player.js     # Player object (stats, exp, level, quests, achievements)
│   │   ├── Quest.js      # Quest model (type, category, complete/reset)
│   │   ├── Stats.js      # Physical / Mind / Focus stats
│   │   ├── Achievement.js# Achievement model (unlock, toJSON)
│   │   └── Streak.js     # Daily streak tracking (record, validate, comeback)
│   ├── services/
│   │   ├── StorageService.js # Local Storage save/load/clear
│   │   ├── GameService.js    # completeQuest, EXP gain, level-up, achievements
│   │   └── QuestService.js   # addQuest, removeQuest, refreshDailyQuests
│   ├── ui/
│   │   ├── Dashboard.js      # Header, EXP bar, streak display
│   │   ├── QuestUI.js        # Quest list + add form rendering
│   │   ├── StatsUI.js        # Stat bars rendering
│   │   └── AchievementUI.js  # Achievement grid + unlock toast
│   └── utils/
│       ├── constants.js  # All magic numbers, quest types, EXP tables, achievements
│       └── helpers.js    # expToNextLevel, date helpers, generateId, clamp
└── data/
    └── defaultQuests.js  # Starter quests seeded on first run
```

## 🚀 Getting Started

No installation required.

1. Clone or download the repository.
2. Open **`index.html`** in any modern browser (Chrome, Firefox, Edge, Safari).
3. Start completing quests and leveling up!

> **Note**: Because the app uses ES Modules (`type="module"`), you need to serve it through a local server if loading locally — e.g. `npx serve .` or VS Code **Live Server** extension.

## 🎮 How It Works

### Quest System
- You can hold **3–5 quests** at a time.
- Each quest has a **type** (Normal / Hard / Legend / Custom) and a **category** (Physical / Mind / Focus).
- Complete a quest → gain EXP + stat points.
- Daily quests (Normal / Hard / Custom) **reset each day**. Legend quests are **one-shot** and removed on completion.

### EXP & Levelling
| Quest Type | Base EXP |
|---|---|
| Normal | 20 |
| Hard | 50 |
| Legend | 120 |
| Custom | 30 |

Streak bonus: **+10% per consecutive day** (capped at +50%).

Level-up formula: `EXP needed = 100 × 1.4^(level−1)`

### Streak System
- Completing any quest on a new day extends your streak.
- Missing a day resets your current streak (best streak is preserved).
- A "Comeback" is tracked when you return after missing days.

### Achievement List
| Achievement | Condition |
|---|---|
| 🌱 First Step | Complete 1 quest |
| ⚡ Getting Serious | Complete 10 quests |
| 🔥 Grinder | Complete 50 quests |
| ⭐ Rising Star | Reach Level 5 |
| 🏆 Veteran | Reach Level 10 |
| 🔗 Consistent | 3-day streak |
| 🗓️ Week Warrior | 7-day streak |
| 💎 Unstoppable | 30-day streak |
| 🔄 Comeback | Return after missing a day |
| 🌟 Legend Seeker | Complete a Legend quest |
| ⚖️ Balanced Hero | 50+ in all three stats |

## 🛠️ Tech Stack

- **Vanilla JavaScript** (ES6+ modules)
- **Local Storage** (JSON serialisation)
- **CSS** (Custom properties, glassmorphism, CSS Grid / Flexbox)
- **No build tools** — runs directly in the browser