// ============================================================
// Stats MODEL — Self Upgrade System
// ============================================================

export class Stats {
  /**
   * @param {object} [data]
   * @param {number} [data.physical]
   * @param {number} [data.mind]
   * @param {number} [data.focus]
   */
  constructor({ physical = 0, mind = 0, focus = 0 } = {}) {
    this.physical = physical;
    this.mind = mind;
    this.focus = focus;
  }

  /**
   * Add points to a specific stat.
   * @param {'physical'|'mind'|'focus'} stat
   * @param {number} amount
   */
  add(stat, amount) {
    if (!(stat in this)) return;
    this[stat] = Math.max(0, this[stat] + amount);
  }

  /**
   * Return a plain object for serialisation.
   * @returns {object}
   */
  toJSON() {
    return {
      physical: this.physical,
      mind: this.mind,
      focus: this.focus,
    };
  }

  /**
   * Restore a Stats instance from a plain object.
   * @param {object} data
   * @returns {Stats}
   */
  static fromJSON(data) {
    return new Stats(data);
  }
}
