// ============================================================
// Streak MODEL — Self Upgrade System
// ============================================================

import { today, yesterday } from '../utils/helpers.js';

export class Streak {
  /**
   * @param {object} [data]
   * @param {number} [data.current]
   * @param {number} [data.best]
   * @param {string|null} [data.lastCompletionDate]
   * @param {number} [data.comebackCount]
   */
  constructor({
    current = 0,
    best = 0,
    lastCompletionDate = null,
    comebackCount = 0,
  } = {}) {
    this.current = current;
    this.best = best;
    this.lastCompletionDate = lastCompletionDate;
    this.comebackCount = comebackCount;
  }

  /**
   * Call when the player completes at least one quest for today.
   * Updates the streak based on whether yesterday was already logged.
   */
  recordCompletion() {
    const todayStr = today();
    const yesterdayStr = yesterday();

    if (this.lastCompletionDate === todayStr) {
      // Already recorded today — nothing to do.
      return;
    }

    if (this.lastCompletionDate === yesterdayStr) {
      // Consecutive day.
      this.current += 1;
    } else if (this.lastCompletionDate !== null && this.lastCompletionDate < yesterdayStr) {
      // Missed at least one day.
      this.comebackCount += 1;
      this.current = 1;
    } else {
      // First ever completion.
      this.current = 1;
    }

    if (this.current > this.best) {
      this.best = this.current;
    }

    this.lastCompletionDate = todayStr;
  }

  /**
   * Check whether the streak was broken (missed a day without completing a quest).
   * Call this on app load to validate.
   */
  validateOnLoad() {
    const todayStr = today();
    const yesterdayStr = yesterday();

    if (
      this.lastCompletionDate !== null &&
      this.lastCompletionDate !== todayStr &&
      this.lastCompletionDate !== yesterdayStr
    ) {
      // Streak broken — reset current (not best).
      this.current = 0;
    }
  }

  toJSON() {
    return {
      current: this.current,
      best: this.best,
      lastCompletionDate: this.lastCompletionDate,
      comebackCount: this.comebackCount,
    };
  }

  static fromJSON(data) {
    return new Streak(data);
  }
}
