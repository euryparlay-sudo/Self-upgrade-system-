// ============================================================
// Achievement MODEL — Self Upgrade System
// ============================================================

export class Achievement {
  /**
   * @param {object} data
   * @param {string} data.id
   * @param {string} data.name
   * @param {string} data.description
   * @param {string} data.icon
   * @param {boolean} [data.unlocked]
   * @param {string|null} [data.unlockedDate]
   */
  constructor({
    id,
    name,
    description,
    icon,
    unlocked = false,
    unlockedDate = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.unlocked = unlocked;
    this.unlockedDate = unlockedDate;
  }

  /**
   * Mark this achievement as unlocked (today's date).
   */
  unlock() {
    this.unlocked = true;
    this.unlockedDate = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      unlocked: this.unlocked,
      unlockedDate: this.unlockedDate,
    };
  }

  static fromJSON(data) {
    return new Achievement(data);
  }
}
