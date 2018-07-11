import { 
  SELECT_HAND_CARD,
  CANCEL_SELECT_HAND_CARD,
  PLAY_SELECTED_HAND_CARD,
  CANCEL_PLAY_SELECTED_HAND_CARD,
  PLACE_ON_PLAY_AREA,
  PLAY_FROM_PLAY_AREA,
  CANCEL_PLAY_FROM_PLAY_AREA,
  SELECT_OPPONENT_FIELD_CARD,
  CANCEL_SELECT_OPPONENT_FIELD_CARD,
  SELECT_PLAYER_FIELD_CARD,
  CANCEL_SELECT_PLAYER_FIELD_CARD,
  ATTACK_CARD } from '../actions/card.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../data/card-rarity.js';

const defaultState = {
  selectedHandCard: {
    id: null,
    instance: -1,
    handIndex: null
  },
  selectedOpponentFieldCard: {
    id: null,
    instance: -1,    
    playAreaIndex: null
  },
  selectedPlayerFieldCard: {
    id: null,
    instance: -1,    
    playAreaIndex: null
  },
  playFromHand: {
    id: null,
    instance: -1,    
    handIndex: null
  },
  playFromPlayArea: {
    id: null,
    instance: -1,    
    playAreaIndex: null
  },
  cards: {
    test: {
      title: 'Hello World',
      rarity: CARD_RARITY_COMMON,
      cost: 3,
      range: 1,
      health: 5,
      attack: 3,
      instances: [
        {
          title: 'Hello World',
          rarity: CARD_RARITY_COMMON,
          cost: 3,
          range: 1,
          health: 5,
          attack: 3
        },
        {
          title: 'Hello World',
          rarity: CARD_RARITY_COMMON,
          cost: 3,
          range: 1,
          health: 5,
          attack: 3
        }
      ]
    },
    beast: {
      title: 'Beast within',
      rarity: CARD_RARITY_RARE,
      cost: 6,
      range: 2,
      health: 5,
      attack: 3,
      instances: [
        {
          title: 'Beast within',
          rarity: CARD_RARITY_RARE,
          cost: 6,
          range: 2,
          health: 5,
          attack: 3
        },
        {
          title: 'Beast within',
          rarity: CARD_RARITY_RARE,
          cost: 6,
          range: 2,
          health: 5,
          attack: 3
        }
      ]
    },
    hero: {
      title: 'Hero within',
      rarity: CARD_RARITY_EPIC,
      cost: 0,
      range: 3,
      health: 5,
      attack: 3,
      instances: [
        {
          title: 'Hero within',
          rarity: CARD_RARITY_EPIC,
          cost: 0,
          range: 3,
          health: 5,
          attack: 3
        },
        {
          title: 'Hero within',
          rarity: CARD_RARITY_EPIC,
          cost: 0,
          range: 3,
          health: 5,
          attack: 3
        }
      ]
    },
    monster: {
      title: 'Monster within',
      rarity: CARD_RARITY_LEGENDARY,
      cost: 1,
      range: 1,
      health: 5,
      attack: 3,
      instances: [
        {
          title: 'Monster within',
          rarity: CARD_RARITY_LEGENDARY,
          cost: 1,
          range: 1,
          health: 5,
          attack: 3
        },
        {
          title: 'Monster within',
          rarity: CARD_RARITY_LEGENDARY,
          cost: 1,
          range: 1,
          health: 5,
          attack: 3
        }
      ]
    },
    pawn: {
      title: 'Pawn within',
      rarity: CARD_RARITY_UNDEFINED,
      cost: 3,
      range: 1,
      health: 5,
      attack: 3,
      instances: [
        {
          title: 'Pawn within',
          rarity: CARD_RARITY_UNDEFINED,
          cost: 3,
          range: 1,
          health: 5,
          attack: 3
        }
      ]
    }
  },
  hand: [
    {
      id: 'test',
      instance: 0
    },
    {
      id: 'hero',
      instance: 1
    },
    {
      id: 'pawn',
      instance: 0
    },
    {
      id: 'monster',
      instance: 0
    },
    {
      id: 'beast',
      instance: 1
    }
  ],
  playerField: [
    {
      id: 'test',
      instance: 1
    },
    {
      id: 'hero',
      instance: 0
    },
    {
      id: null,
      instance: -1,      
    }

  ],
  opponentField: [
    {
      id: null,
      instance: -1,      
    },
    {
      id: null,
      instance: -1,      
    },
    {
      id: 'monster',
      instance: 1
    }

  ]
}

const app = (state = defaultState, action) => {
  let newState
  let handIndex
  let cardId
  let cardInstance
  switch (action.type) {
    case SELECT_HAND_CARD:
      newState = {
        ...state,
        selectedHandCard: {
          ...state.selectedHandCard,
          id: action.cardId,
          instance: action.cardInstance,         
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
      cardInstance = state.selectedHandCard.instance
      newState.hand.splice(handIndex, 0, { 
        id: cardId,
        instance: cardInstance
      })
      newState.selectedHandCard = {
        id: null,
        instance: -1,
        handIndex: null
      }
      return newState
    case PLAY_SELECTED_HAND_CARD:
      return {
        ...state,
        playFromHand: {
          ...state.selectedHandCard,
          id: state.selectedHandCard.id,
          instance: state.selectedHandCard.instance,          
          handIndex: state.selectedHandCard.handIndex
        },
        selectedHandCard: {
          id: null,
          instance: -1,
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
        instance: -1,
        handIndex: null
      }
      return newState
    case PLACE_ON_PLAY_AREA:
      newState = {
        ...state
      }
      newState.playerField[action.playAreaIndex] = {
        id: state.playFromHand.id,
        instance: state.playFromHand.instance
      }
      newState.playFromHand = {
        id: null,
        instance: -1,
        handIndex: null
      }
      return newState
    case PLAY_FROM_PLAY_AREA:
      return {
        ...state,
        playFromPlayArea: {
          ...state.playFromPlayArea,
          id: state.playerField[action.playAreaIndex].id,
          instance: state.playerField[action.playAreaIndex].instance,
          playAreaIndex: action.playAreaIndex
        }
      }
    case CANCEL_PLAY_FROM_PLAY_AREA:
      return {
        ...state,
        playFromPlayArea: {
          id: null,
          instance: -1,
          playAreaIndex: null
        }
      }
    case SELECT_OPPONENT_FIELD_CARD:
      return {
        ...state,
        selectedOpponentFieldCard: {
          ...state.selectedOpponentFieldCard,
          id: state.opponentField[action.playAreaIndex].id,
          instance: state.opponentField[action.playAreaIndex].instance,
          playAreaIndex: action.playAreaIndex
        }
      }
    case CANCEL_SELECT_OPPONENT_FIELD_CARD:
      return {
        ...state,
        selectedOpponentFieldCard: {
          id: null,
          instance: -1,
          playAreaIndex: null
        }
      }
    case SELECT_PLAYER_FIELD_CARD:
      return {
        ...state,
        selectedPlayerFieldCard: {
          ...state.selectedPlayerFieldCard,
          id: state.playerField[action.playAreaIndex].id,
          instance: state.playerField[action.playAreaIndex].instance,
          playAreaIndex: action.playAreaIndex
        }
      }
    case CANCEL_SELECT_PLAYER_FIELD_CARD:
      return {
        ...state,
        selectedPlayerFieldCard: {
          id: null,
          instance: -1,
          playAreaIndex: null
        }
      }
    case ATTACK_CARD:
      return {
        ...state,
        playFromPlayArea: {
          id: null,
          instance: -1,
          playAreaIndex: null
        }
      }
    default:
      return state;
  }
}

export default app;
