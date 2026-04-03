// ============================================================
// HELPERS — Self Upgrade System
// ============================================================

import { LEVEL_UP_BASE_EXP, LEVEL_UP_MULTIPLIER } from './constants.js';

/**
 * Calculate the total EXP required to reach the next level.
 * @param {number} level - Current level (1-based)
 * @returns {number}
 */
export function expToNextLevel(level) {
  return Math.floor(LEVEL_UP_BASE_EXP * Math.pow(LEVEL_UP_MULTIPLIER, level - 1));
}

/**
 * Format a date as YYYY-MM-DD string (local time).
 * @param {Date} [date]
 * @returns {string}
 */
export function toDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Return today's date string.
 * @returns {string}
 */
export function today() {
  return toDateString(new Date());
}

/**
 * Return yesterday's date string.
 * @returns {string}
 */
export function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toDateString(d);
}

/**
 * Generate a simple unique ID.
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Clamp a value between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Deep clone a plain object (JSON round-trip).
 * @param {object} obj
 * @returns {object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
