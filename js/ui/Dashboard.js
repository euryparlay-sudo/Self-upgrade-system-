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
    const trackEl = fillEl?.parentElement;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (labelEl) labelEl.textContent = `${player.exp} / ${needed} EXP`;
    if (trackEl) trackEl.setAttribute('aria-valuenow', pct);
  },

  _renderStreak(player) {
    const streakEl = document.getElementById('streak-value');
    const lastLoginEl = document.getElementById('streak-last-login');

    if (streakEl) {
      streakEl.textContent = `🔥 ${player.streak.current}-day streak`;
    }

    if (lastLoginEl) {
      const lastDate = player.streak.lastCompletionDate;
      if (!lastDate) {
        lastLoginEl.textContent = 'Last login: —';
      } else {
        const MS_PER_DAY = 86400000;
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - MS_PER_DAY).toISOString().slice(0, 10);
        let label;
        if (lastDate === today) {
          label = 'Today';
        } else if (lastDate === yesterday) {
          label = 'Yesterday';
        } else {
          label = new Date(lastDate).toLocaleDateString();
        }
        lastLoginEl.textContent = `Last login: ${label}`;
      }
    }
  },
};
