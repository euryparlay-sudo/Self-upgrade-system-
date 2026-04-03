// ============================================================
// QuestUI — Self Upgrade System
// ============================================================

import { QUEST_TYPES, QUEST_CATEGORY, QUEST_LIMIT } from '../utils/constants.js';

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

export const QuestUI = {
  /** Callback references set by main.js */
  onComplete: null,
  onRemove: null,
  onAdd: null,

  /**
   * Render the full quest list and add-quest form.
   * @param {import('../models/Player.js').Player} player
   */
  render(player) {
    this._renderList(player);
    this._renderAddForm(player);
  },

  _renderList(player) {
    const container = document.getElementById('quest-list');
    if (!container) return;
    container.innerHTML = '';

    if (player.quests.length === 0) {
      container.innerHTML = '<p class="empty-state">No quests yet. Add one below!</p>';
      return;
    }

    player.quests.forEach((quest) => {
      const card = document.createElement('div');
      card.className = `quest-card ${quest.completed ? 'quest-card--done' : ''}`;
      card.dataset.id = quest.id;

      const badge = TYPE_BADGE[quest.type] || TYPE_BADGE[QUEST_TYPES.NORMAL];
      const icon = CATEGORY_ICON[quest.category] || '📌';

      card.innerHTML = `
        <div class="quest-card__header">
          <span class="quest-icon">${icon}</span>
          <span class="quest-title">${this._escape(quest.title)}</span>
          <span class="quest-badge ${badge.css}">${badge.label}</span>
        </div>
        ${quest.description ? `<p class="quest-desc">${this._escape(quest.description)}</p>` : ''}
        <div class="quest-card__actions">
          <button class="btn btn--complete" data-id="${quest.id}" ${quest.completed ? 'disabled' : ''}>
            ${quest.completed ? '✅ Done' : '✔ Complete'}
          </button>
          <button class="btn btn--remove" data-id="${quest.id}">✕ Remove</button>
        </div>
      `;

      container.appendChild(card);
    });

    // Event delegation.
    container.onclick = (e) => {
      const completeBtn = e.target.closest('.btn--complete');
      const removeBtn = e.target.closest('.btn--remove');
      if (completeBtn && !completeBtn.disabled && this.onComplete) {
        this.onComplete(completeBtn.dataset.id);
      }
      if (removeBtn && this.onRemove) {
        this.onRemove(removeBtn.dataset.id);
      }
    };
  },

  _renderAddForm(player) {
    const form = document.getElementById('add-quest-form');
    if (!form) return;

    const atLimit = player.quests.length >= QUEST_LIMIT.MAX;
    const atMin = player.quests.length < QUEST_LIMIT.MIN;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = atLimit;
      submitBtn.title = atLimit
        ? `Max ${QUEST_LIMIT.MAX} quests allowed`
        : '';
    }

    const counter = document.getElementById('quest-counter');
    if (counter) {
      counter.textContent = `${player.quests.length} / ${QUEST_LIMIT.MAX} quests`;
      counter.className = `quest-counter ${atLimit ? 'quest-counter--full' : ''}`;
    }

    // Wire form submission once.
    if (!form.dataset.wired) {
      form.dataset.wired = 'true';
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.onAdd) this.onAdd(this._readForm(form));
      });
    }
  },

  _readForm(form) {
    return {
      title: form.querySelector('#quest-title')?.value.trim(),
      description: form.querySelector('#quest-description')?.value.trim(),
      type: form.querySelector('#quest-type')?.value,
      category: form.querySelector('#quest-category')?.value,
    };
  },

  /** Reset the add-quest form fields. */
  resetForm() {
    const form = document.getElementById('add-quest-form');
    if (form) form.reset();
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
