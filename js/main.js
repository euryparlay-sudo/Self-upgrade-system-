// ============================================================
// main.js — Self Upgrade System entry point
// ============================================================

import { Player } from './models/Player.js';
import { StorageService } from './services/StorageService.js';
import { GameService } from './services/GameService.js';
import { QuestService } from './services/QuestService.js';
import { Dashboard } from './ui/Dashboard.js';
import { QuestUI } from './ui/QuestUI.js';
import { AchievementUI } from './ui/AchievementUI.js';
import { defaultQuests } from '../data/defaultQuests.js';

// ── State ────────────────────────────────────────────────────
let player;

// ── Bootstrap ────────────────────────────────────────────────
function init() {
  const saved = StorageService.load();
  if (saved) {
    player = Player.fromJSON(saved);
  } else {
    // Brand new player — seed default quests (up to MAX limit).
    player = new Player({ name: 'Hero' });
    defaultQuests.forEach((q) => QuestService.addQuest(player, q));
  }

  GameService.onAppLoad(player);
  wireUI();
  renderAll();
}

// ── Wire callbacks ───────────────────────────────────────────
function wireUI() {
  // Quest complete
  QuestUI.onComplete = (questId) => {
    const result = GameService.completeQuest(player, questId);
    showNotification(result.message, result.leveledUp ? 'level-up' : 'success');

    if (result.newlyUnlocked?.length) {
      result.newlyUnlocked.forEach((ach) => AchievementUI.showUnlockToast(ach));
    }

    renderAll();
  };

  // Reset game button
  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all progress? This cannot be undone.')) {
        GameService.resetGame(player);
        player = new Player({ name: 'Hero' });
        defaultQuests.forEach((q) => QuestService.addQuest(player, q));
        StorageService.save(player);
        renderAll();
        showNotification('Game reset. Fresh start!', 'success');
      }
    });
  }

  // Player name edit
  const nameInput = document.getElementById('player-name-input');
  const nameSaveBtn = document.getElementById('btn-save-name');
  if (nameInput && nameSaveBtn) {
    nameInput.value = player.name;
    nameSaveBtn.addEventListener('click', () => {
      const newName = nameInput.value.trim();
      if (newName) {
        player.name = newName;
        StorageService.save(player);
        renderAll();
        showNotification(`Name updated to "${newName}"!`, 'success');
      }
    });
  }
}

// ── Render ───────────────────────────────────────────────────
function renderAll() {
  Dashboard.render(player);
  QuestUI.render(player);
}

// ── Notifications ────────────────────────────────────────────
function showNotification(message, type = 'success') {
  const container = document.getElementById('notification-area');
  if (!container) return;

  const note = document.createElement('div');
  note.className = `notification notification--${type}`;
  note.textContent = message;
  container.appendChild(note);

  requestAnimationFrame(() => note.classList.add('notification--visible'));
  setTimeout(() => {
    note.classList.remove('notification--visible');
    setTimeout(() => note.remove(), 400);
  }, 3000);
}

// ── Start ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
