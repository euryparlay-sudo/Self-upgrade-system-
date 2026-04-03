// ============================================================
// Dashboard UI — Self Upgrade System
// ============================================================

import { expToNextLevel } from '../utils/helpers.js';

export const Dashboard = {
  /**
   * Full dashboard render.
   * @param {import('../models/Player.js').Player} player
   */
  render(player) {
    this._renderHeader(player);
    this._renderExpBar(player);
    this._renderStreak(player);
  },

  _renderHeader(player) {
    const nameEl = document.getElementById('player-name');
    const levelEl = document.getElementById('player-level');
    if (nameEl) nameEl.textContent = player.name;
    if (levelEl) levelEl.textContent = `Level ${player.level}`;
  },

  _renderExpBar(player) {
    const needed = expToNextLevel(player.level);
    const pct = Math.min(100, Math.floor((player.exp / needed) * 100));

    const fillEl = document.getElementById('exp-bar-fill');
    const labelEl = document.getElementById('exp-label');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (labelEl) labelEl.textContent = `${player.exp} / ${needed} EXP`;
  },

  _renderStreak(player) {
    const streakEl = document.getElementById('streak-value');
    const bestEl = document.getElementById('streak-best');
    if (streakEl) streakEl.textContent = `🔥 ${player.streak.current}-day streak`;
    if (bestEl) bestEl.textContent = `Best: ${player.streak.best}`;
  },
};
