// ============================================================
// StorageService — Self Upgrade System
// ============================================================

import { STORAGE_KEY } from '../utils/constants.js';

export const StorageService = {
  /**
   * Save the player object to Local Storage.
   * @param {import('../models/Player.js').Player} player
   */
  save(player) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player.toJSON()));
    } catch (err) {
      console.error('[StorageService] Failed to save:', err);
    }
  },

  /**
   * Load and return raw player data from Local Storage.
   * Returns null if nothing is stored yet.
   * @returns {object|null}
   */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('[StorageService] Failed to load:', err);
      return null;
    }
  },

  /**
   * Clear all game data from Local Storage.
   */
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
