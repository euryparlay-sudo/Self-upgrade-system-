// ============================================================
// CONSTANTS — Self Upgrade System
// ============================================================

export const QUEST_LIMIT = { MIN: 3, MAX: 5 };

export const QUEST_TYPES = {
  NORMAL: 'normal',
  HARD: 'hard',
  LEGEND: 'legend',
  CUSTOM: 'custom',
};

export const QUEST_CATEGORY = {
  PHYSICAL: 'physical',
  MIND: 'mind',
  FOCUS: 'focus',
};

export const EXP_REWARDS = {
  [QUEST_TYPES.NORMAL]: 20,
  [QUEST_TYPES.HARD]: 50,
  [QUEST_TYPES.LEGEND]: 120,
  [QUEST_TYPES.CUSTOM]: 30,
};

export const STAT_GAINS = {
  [QUEST_TYPES.NORMAL]: 1,
  [QUEST_TYPES.HARD]: 2,
  [QUEST_TYPES.LEGEND]: 5,
  [QUEST_TYPES.CUSTOM]: 1,
};

export const LEVEL_UP_BASE_EXP = 100; // Base EXP used in the formula: floor(100 * 1.4^(level-1))
export const LEVEL_UP_MULTIPLIER = 1.4; // Each level requires 40% more EXP than the previous

export const STREAK_BONUS_MULTIPLIER = 0.1; // +10% EXP per streak day (max capped)
export const STREAK_BONUS_CAP = 0.5;        // max +50% EXP from streak

export const ACHIEVEMENTS = {
  FIRST_QUEST: {
    id: 'first_quest',
    name: 'First Step',
    description: 'Complete your first quest.',
    icon: '🌱',
    condition: (player) => player.totalQuestsCompleted >= 1,
  },
  QUEST_10: {
    id: 'quest_10',
    name: 'Getting Serious',
    description: 'Complete 10 quests.',
    icon: '⚡',
    condition: (player) => player.totalQuestsCompleted >= 10,
  },
  QUEST_50: {
    id: 'quest_50',
    name: 'Grinder',
    description: 'Complete 50 quests.',
    icon: '🔥',
    condition: (player) => player.totalQuestsCompleted >= 50,
  },
  LEVEL_5: {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach Level 5.',
    icon: '⭐',
    condition: (player) => player.level >= 5,
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Veteran',
    description: 'Reach Level 10.',
    icon: '🏆',
    condition: (player) => player.level >= 10,
  },
  STREAK_3: {
    id: 'streak_3',
    name: 'Consistent',
    description: 'Maintain a 3-day streak.',
    icon: '🔗',
    condition: (player) => player.streak.current >= 3,
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak.',
    icon: '🗓️',
    condition: (player) => player.streak.current >= 7,
  },
  STREAK_30: {
    id: 'streak_30',
    name: 'Unstoppable',
    description: 'Maintain a 30-day streak.',
    icon: '💎',
    condition: (player) => player.streak.current >= 30,
  },
  COMEBACK: {
    id: 'comeback',
    name: 'Comeback',
    description: 'Return after missing a day.',
    icon: '🔄',
    condition: (player) => player.streak.comebackCount >= 1,
  },
  LEGEND_QUEST: {
    id: 'legend_quest',
    name: 'Legend Seeker',
    description: 'Complete a Legend quest.',
    icon: '🌟',
    condition: (player) => player.legendQuestsCompleted >= 1,
  },
  MAX_STATS: {
    id: 'max_stats',
    name: 'Balanced Hero',
    description: 'Reach 50 in all three stats.',
    icon: '⚖️',
    condition: (player) =>
      player.stats.physical >= 50 &&
      player.stats.mind >= 50 &&
      player.stats.focus >= 50,
  },
};

export const STORAGE_KEY = 'selfUpgradeSystem_v1';
