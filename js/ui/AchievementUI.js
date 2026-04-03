// ============================================================
// AchievementUI — Self Upgrade System
// ============================================================

export const AchievementUI = {
  /**
   * @param {import('../models/Player.js').Player} player
   */
  render(player) {
    const container = document.getElementById('achievement-list');
    if (!container) return;
    container.innerHTML = '';

    player.achievements.forEach((ach) => {
      const item = document.createElement('div');
      item.className = `achievement-item ${ach.unlocked ? 'achievement-item--unlocked' : 'achievement-item--locked'}`;
      item.innerHTML = `
        <span class="achievement-icon">${ach.unlocked ? ach.icon : '🔒'}</span>
        <div class="achievement-info">
          <span class="achievement-name">${this._escape(ach.name)}</span>
          <span class="achievement-desc">${this._escape(ach.description)}</span>
          ${ach.unlocked && ach.unlockedDate
            ? `<span class="achievement-date">Unlocked ${new Date(ach.unlockedDate).toLocaleDateString()}</span>`
            : ''}
        </div>
      `;
      container.appendChild(item);
    });
  },

  /**
   * Show a brief toast notification for a newly unlocked achievement.
   * @param {import('../models/Achievement.js').Achievement} achievement
   */
  showUnlockToast(achievement) {
    const toast = document.createElement('div');
    toast.className = 'toast toast--achievement';
    toast.innerHTML = `
      <span class="toast__icon">${achievement.icon}</span>
      <div class="toast__body">
        <strong>Achievement Unlocked!</strong>
        <span>${this._escape(achievement.name)}</span>
      </div>
    `;
    document.body.appendChild(toast);

    // Trigger animation then remove.
    requestAnimationFrame(() => toast.classList.add('toast--visible'));
    setTimeout(() => {
      toast.classList.remove('toast--visible');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  },

  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
};
