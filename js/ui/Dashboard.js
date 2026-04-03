// ============================================================
// Dashboard UI — Self Upgrade System
// Renders all 3 sections: Player Info, Stats, Quests
// ============================================================

import { expToNextLevel } from '../utils/helpers.js';
import { EXP_REWARDS } from '../utils/constants.js';

export class Dashboard {
  /**
   * @param {import('../models/Player.js').Player} player
   */
  constructor(player) {
    this.player = player;
    /** @type {((questId: string) => void) | null} */
    this.onComplete = null;
  }

  render() {
    this.renderPlayerInfo();
    this.renderStats();
    this.renderQuests();
  }

  renderPlayerInfo() {
    const section = document.getElementById('player-info');
    if (!section) return;

    const needed = expToNextLevel(this.player.level);
    const expPercent = Math.min(100, Math.floor((this.player.exp / needed) * 100));

    section.innerHTML = `
      <div class="player-header">${this._escape(this.player.name)}</div>
      <div class="player-meta">
        <span>Level ${this.player.level}</span>
        <span>🔥 ${this.player.streak.current}-day streak</span>
      </div>
      <div>
        <div class="exp-label">EXP: ${this.player.exp} / ${needed}</div>
        <div class="exp-bar">
          <div class="exp-fill" style="width: ${expPercent}%"></div>
        </div>
      </div>
    `;
  }

  renderStats() {
    const section = document.getElementById('stats');
    if (!section) return;

    const { physical, mind, focus } = this.player.stats;

    section.innerHTML = `
      <div class="stats-title">Stats</div>
      <div class="stat-row">
        <span class="stat-label">💪 Physical</span>
        <span class="stat-value">${physical}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">🧠 Mind</span>
        <span class="stat-value">${mind}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">🎯 Focus</span>
        <span class="stat-value">${focus}</span>
      </div>
    `;
  }

  renderQuests() {
    const section = document.getElementById('quests');
    if (!section) return;

    const quests = this.player.quests;

    let html = `<div class="quests-title">Today's Quests</div>`;

    if (quests.length === 0) {
      html += '<p style="color: var(--text-secondary); font-size: 14px;">No quests for today.</p>';
    } else {
      html += quests.map((quest) => {
        const expReward = quest.type in EXP_REWARDS ? EXP_REWARDS[quest.type] : EXP_REWARDS.normal;
        return `
          <div class="quest-item">
            <div class="quest-info">
              <div class="quest-text">${this._escape(quest.title)}</div>
              <div class="quest-meta">${this._capitalize(quest.category)} &bull; +${expReward} EXP</div>
            </div>
            <button
              class="quest-btn"
              ${quest.completed ? 'disabled' : ''}
              data-quest-id="${this._escape(quest.id)}"
            >${quest.completed ? '✓ Done' : 'Complete'}</button>
          </div>
        `;
      }).join('');
    }

    section.innerHTML = html;

    // Wire complete buttons via event delegation (replace any previous handler).
    section.onclick = (e) => {
      const btn = e.target.closest('.quest-btn');
      if (btn && !btn.disabled && this.onComplete) {
        this.onComplete(btn.dataset.questId);
      }
    };
  }

  /** Capitalise the first letter of a string. */
  _capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /** Safely escape HTML to prevent XSS. */
  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

