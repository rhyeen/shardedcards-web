import { 
  UPDATE_CARD_TITLE } from '../actions/card.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../data/card-rarity.js';

const defaultState = {
  test: {
    title: "Hello World",
    rarity: CARD_RARITY_COMMON
  },
  beast: {
    title: "Beast within",
    rarity: CARD_RARITY_RARE
  },
  hero: {
    title: "Hero within",
    rarity: CARD_RARITY_EPIC
  },
  monster: {
    title: "Monster within",
    rarity: CARD_RARITY_LEGENDARY
  },
  pawn: {
    title: "Pawn within",
    rarity: CARD_RARITY_UNDEFINED
  }
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_CARD_TITLE:
      return {
        ...state[action.cardId],
        cardTitle: action.cardTitle
      }
    default:
      return state;
  }
}

export default app;
