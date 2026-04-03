// ============================================================
// GameService — Self Upgrade System
// ============================================================

import {
  EXP_REWARDS,
  STAT_GAINS,
  ACHIEVEMENTS,
  STREAK_BONUS_MULTIPLIER,
  STREAK_BONUS_CAP,
  QUEST_TYPES,
} from '../utils/constants.js';
import { expToNextLevel, clamp } from '../utils/helpers.js';
import { StorageService } from './StorageService.js';
import { QuestService } from './QuestService.js';

export const GameService = {
  /**
   * Complete a quest: award EXP, update stats, update streak, check achievements.
   * @param {import('../models/Player.js').Player} player
   * @param {string} questId
   * @returns {{ success: boolean, message: string, expGained?: number, leveledUp?: boolean }}
   */
  completeQuest(player, questId) {
    const quest = QuestService.findQuest(player, questId);
    if (!quest) return { success: false, message: 'Quest not found.' };
    if (quest.completed) return { success: false, message: 'Quest already completed.' };

    // Mark quest complete.
    quest.complete();

    // Update counters.
    player.totalQuestsCompleted += 1;
    if (quest.type === QUEST_TYPES.LEGEND) {
      player.legendQuestsCompleted += 1;
    }

    // Update streak before calculating bonus.
    player.streak.recordCompletion();

    // Calculate EXP with streak bonus.
    const baseExp = EXP_REWARDS[quest.type] ?? EXP_REWARDS[QUEST_TYPES.NORMAL];
    const streakBonus = clamp(
      (player.streak.current - 1) * STREAK_BONUS_MULTIPLIER,
      0,
      STREAK_BONUS_CAP
    );
    const expGained = Math.floor(baseExp * (1 + streakBonus));

    // Add EXP and handle level-up.
    const leveledUp = this._addExp(player, expGained);

    // Update the relevant stat.
    const statGain = STAT_GAINS[quest.type] ?? STAT_GAINS[QUEST_TYPES.NORMAL];
    player.stats.add(quest.category, statGain);

    // Check achievements.
    const newlyUnlocked = this._checkAchievements(player);

    // Persist.
    StorageService.save(player);

    return {
      success: true,
      message: leveledUp
        ? `Level up! You are now level ${player.level}! (+${expGained} EXP)`
        : `Quest complete! +${expGained} EXP`,
      expGained,
      leveledUp,
      newlyUnlocked,
    };
  },

  /**
   * Add EXP to the player, triggering level-ups as needed.
   * @param {import('../models/Player.js').Player} player
   * @param {number} amount
   * @returns {boolean} true if at least one level-up occurred
   */
  _addExp(player, amount) {
    player.exp += amount;
    let leveled = false;
    let needed = expToNextLevel(player.level);

    while (player.exp >= needed) {
      player.exp -= needed;
      player.level += 1;
      leveled = true;
      needed = expToNextLevel(player.level);
    }
    return leveled;
  },

  /**
   * Evaluate all achievement conditions and unlock any newly met ones.
   * @param {import('../models/Player.js').Player} player
   * @returns {Achievement[]} newly unlocked achievements
   */
  _checkAchievements(player) {
    const newlyUnlocked = [];
    player.achievements.forEach((achievement) => {
      if (achievement.unlocked) return;
      const def = Object.values(ACHIEVEMENTS).find((d) => d.id === achievement.id);
      if (def && def.condition(player)) {
        achievement.unlock();
        newlyUnlocked.push(achievement);
      }
    });
    return newlyUnlocked;
  },

  /**
   * Initialise or reload player state on app start.
   * Validates the streak (resets if broken) and refreshes daily quests.
   * @param {import('../models/Player.js').Player} player
   */
  onAppLoad(player) {
    player.streak.validateOnLoad();
    QuestService.refreshDailyQuests(player);
    StorageService.save(player);
  },

  /**
   * Reset the player's game data back to defaults and persist.
   * @param {import('../models/Player.js').Player} player
   */
  resetGame(player) {
    StorageService.clear();
    // Caller should re-initialise a fresh Player.
  },
};
