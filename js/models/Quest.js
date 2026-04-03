// ============================================================
// Quest MODEL — Self Upgrade System
// ============================================================

import { QUEST_TYPES, QUEST_CATEGORY } from '../utils/constants.js';
import { generateId, today } from '../utils/helpers.js';

export class Quest {
  /**
   * @param {object} data
   * @param {string} [data.id]
   * @param {string} data.title
   * @param {string} [data.description]
   * @param {string} [data.type]       - One of QUEST_TYPES
   * @param {string} [data.category]   - One of QUEST_CATEGORY
   * @param {boolean} [data.completed]
   * @param {string|null} [data.completedDate]
   * @param {string} [data.createdDate]
   */
  constructor({
    id = generateId(),
    title,
    description = '',
    type = QUEST_TYPES.NORMAL,
    category = QUEST_CATEGORY.FOCUS,
    completed = false,
    completedDate = null,
    createdDate = today(),
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.category = category;
    this.completed = completed;
    this.completedDate = completedDate;
    this.createdDate = createdDate;
  }

  /**
   * Mark quest as completed today.
   */
  complete() {
    this.completed = true;
    this.completedDate = today();
  }

  /**
   * Reset completion status (for daily quests on a new day).
   */
  reset() {
    this.completed = false;
    this.completedDate = null;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      type: this.type,
      category: this.category,
      completed: this.completed,
      completedDate: this.completedDate,
      createdDate: this.createdDate,
    };
  }

  static fromJSON(data) {
    return new Quest(data);
  }
}
