// ============================================================
// StatsUI — Self Upgrade System
// ============================================================

export const StatsUI = {
  /**
   * @param {import('../models/Player.js').Player} player
   */
  render(player) {
    const stats = player.stats;
    ['physical', 'mind', 'focus'].forEach((key) => {
      const valueEl = document.getElementById(`stat-${key}-value`);
      const barEl = document.getElementById(`stat-${key}-bar`);
      const value = stats[key] ?? 0;
      const pct = Math.min(100, value); // 100 = visual max

      if (valueEl) valueEl.textContent = value;
      if (barEl) barEl.style.width = `${pct}%`;
    });
  },
};
