// ============================================================
// defaultQuests — Self Upgrade System
// ============================================================

import { QUEST_TYPES, QUEST_CATEGORY } from '../js/utils/constants.js';

/**
 * Starter quest templates.
 * Used to seed a brand-new player's quest list.
 */
export const defaultQuests = [
  {
    title: 'Morning Workout',
    description: 'Do at least 15 minutes of physical exercise.',
    type: QUEST_TYPES.NORMAL,
    category: QUEST_CATEGORY.PHYSICAL,
  },
  {
    title: 'Read 10 Pages',
    description: 'Read 10 pages of any book or educational material.',
    type: QUEST_TYPES.NORMAL,
    category: QUEST_CATEGORY.MIND,
  },
  {
    title: 'Deep Work Session',
    description: 'Complete a 45-minute focused work or study session.',
    type: QUEST_TYPES.HARD,
    category: QUEST_CATEGORY.FOCUS,
  },
  {
    title: 'No Social Media Hour',
    description: 'Stay off social media for one full hour.',
    type: QUEST_TYPES.HARD,
    category: QUEST_CATEGORY.FOCUS,
  },
  {
    title: 'Weekly Legend: 3-Day Streak',
    description: 'Complete at least one quest every day for 3 consecutive days.',
    type: QUEST_TYPES.LEGEND,
    category: QUEST_CATEGORY.MIND,
  },
];
