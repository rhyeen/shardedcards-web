import { 
  SELECT_HAND_CARD,
  CANCEL_SELECT_HAND_CARD,
  PLAY_SELECTED_HAND_CARD,
  CANCEL_PLAY_SELECTED_HAND_CARD,
  PLACE_ON_PLAY_AREA,
  PLAY_FROM_PLAY_AREA,
  SELECT_OPPONENT_FIELD_CARD } from '../actions/card.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../data/card-rarity.js';

const defaultState = {
  selectedHandCard: {
    id: null,
    handIndex: null
  },
  selectedOpponentFieldCard: {
    id: null,
    playAreaIndex: null
  },
  selectedPlayerFieldCard: {
    id: null,
    playAreaIndex: null
  },
  playFromHand: {
    id: null,
    handIndex: null
  },
  playFromPlayArea: {
    id: null,
    playAreaIndex: null
  },
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
  playerField: [
    {
      id: 'test'
    },
    {
      id: 'hero'
    },
    {
      id: null
    }

  ],
  opponentField: [
    {
      id: null
    },
    {
      id: null
    },
    {
      id: 'monster'
    }

  ]
}

const app = (state = defaultState, action) => {
  let newState
  let handIndex
  let cardId
  switch (action.type) {
    case SELECT_HAND_CARD:
      newState = {
        ...state,
        selectedHandCard: {
          ...state.selectedHandCard,
          id: action.cardId,
          handIndex: action.handIndex
        }
      }
      newState.hand.splice(action.handIndex, 1)
      return newState
    case CANCEL_SELECT_HAND_CARD:
      newState = {
        ...state
      }
      handIndex = state.selectedHandCard.handIndex
      cardId = state.selectedHandCard.id
      newState.hand.splice(handIndex, 0, { id: cardId })
      newState.selectedHandCard = {
        id: null,
        handIndex: null
      }
      return newState
    case PLAY_SELECTED_HAND_CARD:
      return {
        ...state,
        playFromHand: {
          ...state.selectedHandCard,
          id: state.selectedHandCard.id,
          handIndex: state.selectedHandCard.handIndex
        },
        selectedHandCard: {
          id: null,
          handIndex: null
        }
      }
    case CANCEL_PLAY_SELECTED_HAND_CARD:
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
    case PLACE_ON_PLAY_AREA:
      newState = {
        ...state
      }
      newState.playerField[action.playAreaIndex] = {
        id: state.playFromHand.id
      }
      newState.playFromHand = {
        id: null,
        handIndex: null
      }
      return newState
    case PLAY_FROM_PLAY_AREA:
      return {
        ...state,
        playFromPlayArea: {
          ...state.playFromPlayArea,
          id: state.playerField[action.playAreaIndex].id,
          handIndex: action.playAreaIndex
        }
      }
    case SELECT_OPPONENT_FIELD_CARD:
      return {
        ...state,
        selectedOpponentFieldCard: {
          ...state.selectedOpponentFieldCard,
          id: state.playerField[action.playAreaIndex].id,
          handIndex: action.playAreaIndex
        }
      }
    default:
      return state;
  }
}

export default app;
