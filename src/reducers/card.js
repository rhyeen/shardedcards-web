import { 
  SELECT_CARD,
  CANCEL_SELECT_CARD,
  PLAY_SELECTED_CARD,
  CANCEL_PLAY_SELECTED_CARD,
  PLACE_ON_LEFT_PANE,
  PLACE_ON_MIDDLE_PANE,
  PLACE_ON_RIGHT_PANE } from '../actions/card.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../data/card-rarity.js';

const defaultState = {
  cards: {
    test: {
      title: 'Hello World',
      rarity: CARD_RARITY_COMMON
    },
    beast: {
      title: 'Beast within',
      rarity: CARD_RARITY_RARE
    },
    hero: {
      title: 'Hero within',
      rarity: CARD_RARITY_EPIC
    },
    monster: {
      title: 'Monster within',
      rarity: CARD_RARITY_LEGENDARY
    },
    pawn: {
      title: 'Pawn within',
      rarity: CARD_RARITY_UNDEFINED
    }
  },
  selectedCard: {
    id: null,
    handIndex: null
  },
  playFromHand: {
    id: null,
    handIndex: null
  },
  hand: [
    {
      id: 'test'
    },
    {
      id: 'hero'
    },
    {
      id: 'pawn'
    },
    {
      id: 'monster'
    },
    {
      id: 'beast'
    }
  ],
  playedCards: {},
  playerField: {
    left: {
      id: 'test'
    },
    middle: {
      id: 'hero'
    },
    right: {
      id: null
    }
  },
  opponentField: {
    left: {
      id: null
    },
    middle: {
      id: null
    },
    right: {
      id: 'monster'
    }
  }
}

const app = (state = defaultState, action) => {
  let newState
  let handIndex
  let cardId
  switch (action.type) {
    case SELECT_CARD:
      newState = {
        ...state,
        selectedCard: {
          ...state.selectedCard,
          id: action.cardId,
          handIndex: action.handIndex
        }
      }
      newState.hand.splice(action.handIndex, 1)
      return newState
    case CANCEL_SELECT_CARD:
      newState = {
        ...state
      }
      handIndex = state.selectedCard.handIndex
      cardId = state.selectedCard.id
      newState.hand.splice(handIndex, 0, { id: cardId })
      newState.selectedCard = {
        id: null,
        handIndex: null
      }
      return newState
    case PLAY_SELECTED_CARD:
      return {
        ...state,
        playFromHand: {
          ...state.selectedCard,
          id: state.selectedCard.id,
          handIndex: state.selectedCard.handIndex
        },
        selectedCard: {
          id: null,
          handIndex: null
        }
      }
    case CANCEL_PLAY_SELECTED_CARD:
      newState = {
        ...state
      }
      handIndex = state.playFromHand.handIndex
      cardId = state.playFromHand.id
      newState.hand.splice(handIndex, 0, { id: cardId })
      newState.playFromHand = {
        id: null,
        handIndex: null
      }
      return newState
    case PLACE_ON_LEFT_PANE:
      return {
        ...state,
        playerField: {
          ...state.playerField,
          left: {
            id: state.playFromHand.id
          }
        },
        playFromHand: {
          id: null,
          handIndex: null
        }
      }
    case PLACE_ON_MIDDLE_PANE:
      return {
        ...state,
        playerField: {
          ...state.playerField,
          middle: {
            id: state.playFromHand.id
          }
        },
        playFromHand: {
          id: null,
          handIndex: null
        }
      }
    case PLACE_ON_RIGHT_PANE:
      return {
        ...state,
        playerField: {
          ...state.playerField,
          right: {
            id: state.playFromHand.id
          }
        },
        playFromHand: {
          id: null,
          handIndex: null
        }
      }
    default:
      return state;
  }
}

export default app;
