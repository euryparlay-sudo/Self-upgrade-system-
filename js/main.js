// ============================================================
// main.js — Self Upgrade System entry point
// ============================================================

import { Player } from './models/Player.js';
import { StorageService } from './services/StorageService.js';
import { GameService } from './services/GameService.js';
import { QuestService } from './services/QuestService.js';
import { Dashboard } from './ui/Dashboard.js';
import { defaultQuests } from '../data/defaultQuests.js';

// ── State ────────────────────────────────────────────────────
let player;
let dashboard;

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

  dashboard = new Dashboard(player);
  dashboard.onComplete = (questId) => {
    const result = GameService.completeQuest(player, questId);
    showNotification(result.message, result.leveledUp ? 'level-up' : 'success');
    renderAll();
  };

  renderAll();
}

// ── Render ───────────────────────────────────────────────────
function renderAll() {
  dashboard.render();
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

