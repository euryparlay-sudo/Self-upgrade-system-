// ============================================================
// Player MODEL — Self Upgrade System
// ============================================================

import { Stats } from './Stats.js';
import { Streak } from './Streak.js';
import { Achievement } from './Achievement.js';
import { Quest } from './Quest.js';
import { ACHIEVEMENTS } from '../utils/constants.js';

export class Player {
  /**
   * @param {object} [data]
   * @param {string} [data.name]
   * @param {number} [data.level]
   * @param {number} [data.exp]
   * @param {object} [data.stats]
   * @param {object} [data.streak]
   * @param {object[]} [data.quests]
   * @param {object[]} [data.achievements]
   * @param {number} [data.totalQuestsCompleted]
   * @param {number} [data.legendQuestsCompleted]
   */
  constructor({
    name = 'Hero',
    level = 1,
    exp = 0,
    stats = {},
    streak = {},
    quests = [],
    achievements = [],
    totalQuestsCompleted = 0,
    legendQuestsCompleted = 0,
  } = {}) {
    this.name = name;
    this.level = level;
    this.exp = exp;
    this.stats = stats instanceof Stats ? stats : new Stats(stats);
    this.streak = streak instanceof Streak ? streak : new Streak(streak);
    this.quests = quests.map((q) => (q instanceof Quest ? q : Quest.fromJSON(q)));
    this.achievements = this._initAchievements(achievements);
    this.totalQuestsCompleted = totalQuestsCompleted;
    this.legendQuestsCompleted = legendQuestsCompleted;
  }

  /**
   * Merge saved achievement data with the canonical ACHIEVEMENTS list so
   * newly added achievements are always present.
   * @param {object[]} saved
   * @returns {Achievement[]}
   */
  _initAchievements(saved) {
    const savedMap = {};
    saved.forEach((a) => {
      const obj = a instanceof Achievement ? a : Achievement.fromJSON(a);
      savedMap[obj.id] = obj;
    });

    return Object.values(ACHIEVEMENTS).map((def) => {
      if (savedMap[def.id]) return savedMap[def.id];
      return new Achievement({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
      });
    });
  }

  toJSON() {
    return {
      name: this.name,
      level: this.level,
      exp: this.exp,
      stats: this.stats.toJSON(),
      streak: this.streak.toJSON(),
      quests: this.quests.map((q) => q.toJSON()),
      achievements: this.achievements.map((a) => a.toJSON()),
      totalQuestsCompleted: this.totalQuestsCompleted,
      legendQuestsCompleted: this.legendQuestsCompleted,
    };
  }

  static fromJSON(data) {
    return new Player(data);
  }
}
