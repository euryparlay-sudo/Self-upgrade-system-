// ============================================================
// QuestService — Self Upgrade System
// ============================================================

import { Quest } from '../models/Quest.js';
import { QUEST_LIMIT, QUEST_TYPES } from '../utils/constants.js';
import { today } from '../utils/helpers.js';

export const QuestService = {
  /**
   * Add a new quest to the player's quest list.
   * Enforces the 3–5 quest limit.
   * @param {import('../models/Player.js').Player} player
   * @param {object} questData
   * @returns {{ success: boolean, message: string }}
   */
  addQuest(player, questData) {
    if (player.quests.length >= QUEST_LIMIT.MAX) {
      return {
        success: false,
        message: `Quest limit reached (max ${QUEST_LIMIT.MAX}). Complete or remove a quest first.`,
      };
    }
    const quest = new Quest(questData);
    player.quests.push(quest);
    return { success: true, message: 'Quest added!', quest };
  },

  /**
   * Remove a quest by ID.
   * @param {import('../models/Player.js').Player} player
   * @param {string} questId
   * @returns {{ success: boolean, message: string }}
   */
  removeQuest(player, questId) {
    const index = player.quests.findIndex((q) => q.id === questId);
    if (index === -1) {
      return { success: false, message: 'Quest not found.' };
    }
    player.quests.splice(index, 1);
    return { success: true, message: 'Quest removed.' };
  },

  /**
   * Return a quest by ID or null.
   * @param {import('../models/Player.js').Player} player
   * @param {string} questId
   * @returns {Quest|null}
   */
  findQuest(player, questId) {
    return player.quests.find((q) => q.id === questId) || null;
  },

  /**
   * Reset all non-legend quests that were completed before today (for daily refresh).
   * Legend quests are one-shot and are removed once completed.
   * @param {import('../models/Player.js').Player} player
   */
  refreshDailyQuests(player) {
    const todayStr = today();
    player.quests = player.quests.filter((q) => {
      // Remove completed legend quests (they are one-time challenges).
      if (q.completed && q.type === QUEST_TYPES.LEGEND) return false;
      return true;
    });

    player.quests.forEach((q) => {
      if (q.completed && q.completedDate !== todayStr) {
        q.reset();
      }
    });
  },
};
