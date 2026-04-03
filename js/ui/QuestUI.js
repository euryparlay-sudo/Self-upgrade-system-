// ============================================================
// QuestUI — Self Upgrade System
// ============================================================

import { QUEST_TYPES, QUEST_CATEGORY, EXP_REWARDS } from '../utils/constants.js';

const TYPE_BADGE = {
  [QUEST_TYPES.NORMAL]: { label: 'Normal', css: 'badge--normal' },
  [QUEST_TYPES.HARD]: { label: 'Hard', css: 'badge--hard' },
  [QUEST_TYPES.LEGEND]: { label: 'Legend', css: 'badge--legend' },
  [QUEST_TYPES.CUSTOM]: { label: 'Custom', css: 'badge--custom' },
};

const CATEGORY_ICON = {
  [QUEST_CATEGORY.PHYSICAL]: '💪',
  [QUEST_CATEGORY.MIND]: '🧠',
  [QUEST_CATEGORY.FOCUS]: '🎯',
};

const CATEGORY_LABEL = {
  [QUEST_CATEGORY.PHYSICAL]: 'Physical',
  [QUEST_CATEGORY.MIND]: 'Mind',
  [QUEST_CATEGORY.FOCUS]: 'Focus',
};

export const QuestUI = {
  /** Callback set by main.js */
  onComplete: null,

  /**
   * Render today's quest list.
   * @param {import('../models/Player.js').Player} player
   */
  render(player) {
    this._renderList(player);
  },

  _renderList(player) {
    const container = document.getElementById('quest-list');
    if (!container) return;
    container.innerHTML = '';

    if (player.quests.length === 0) {
      container.innerHTML = '<p class="empty-state">No quests for today. Check back tomorrow!</p>';
      return;
    }

    player.quests.forEach((quest) => {
      const card = document.createElement('div');
      card.className = `quest-card ${quest.completed ? 'quest-card--done' : ''}`;
      card.dataset.id = quest.id;

      const badge = TYPE_BADGE[quest.type] ?? TYPE_BADGE[QUEST_TYPES.NORMAL];
      const icon = CATEGORY_ICON[quest.category] ?? '📌';
      const categoryLabel = CATEGORY_LABEL[quest.category] ?? quest.category;
      const expReward = EXP_REWARDS[quest.type] ?? EXP_REWARDS[QUEST_TYPES.NORMAL];

      card.innerHTML = `
        <div class="quest-card__header">
          <span class="quest-icon">${icon}</span>
          <span class="quest-title">${this._escape(quest.title)}</span>
          <span class="quest-badge ${badge.css}">${badge.label}</span>
        </div>
        <p class="quest-meta">${categoryLabel} &bull; +${expReward} EXP</p>
        <div class="quest-card__actions">
          <button class="btn btn--complete" data-id="${quest.id}" ${quest.completed ? 'disabled' : ''}>
            ${quest.completed ? '✅ Done' : '✔ Complete'}
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Event delegation for complete button.
    container.onclick = (e) => {
      const completeBtn = e.target.closest('.btn--complete');
      if (completeBtn && !completeBtn.disabled && this.onComplete) {
        this.onComplete(completeBtn.dataset.id);
      }
    };
  },

  /** Safely escape HTML to avoid XSS. */
  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};
