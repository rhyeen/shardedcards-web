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
  ATTACK_CARD,
  CLEAR_HAND,
  SET_HAND,
  REFRESH_CARDS,
  SET_CARDS,
  SET_OPPONENT_FIELD,
  SET_FIELD_FROM_OPPONENT_TURN,
  RESET_CARDS } from '../actions/card.js';

import {
  PlaceOnPlayAreaResults,
  RefreshPlayerCards,
  AttackOpponentCardResults,
  ResetDiscardedHand } from '../util/card.js';

import {
  SetOpponentTurnResults } from '../util/opponent-turn.js';

const defaultState = {
  selectedHandCard: {
    id: null,
    instance: null,
    handIndex: null
  },
  selectedOpponentFieldCard: {
    id: null,
    instance: null,    
    playAreaIndex: null
  },
  selectedPlayerFieldCard: {
    id: null,
    instance: null,    
    playAreaIndex: null
  },
  playFromHand: {
    id: null,
    instance: null,    
    handIndex: null
  },
  playFromPlayArea: {
    id: null,
    instance: null,    
    playAreaIndex: null
  },
  cards: {},
  opponentCards: {},
  hand: [],
  handSize: 5,
  deckSize: 0,
  discardPileSize: 0,
  lostCardsSize: 0,
  playerField: [
    {
      id: null,
      instance: null,      
    },
    {
      id: null,
      instance: null,      
    },
    {
      id: null,
      instance: null,      
    }
  ],
  opponentFieldBacklog: [
    0, 0, 0
  ],
  opponentField: [
    {
      id: null,
      instance: null,      
    },
    {
      id: null,
      instance: null,      
    },
    {
      id: null,
      instance: null,      
    }
  ]
}

const app = (state = defaultState, action) => {
  let handIndex, cardId, cardInstance
  switch (action.type) {
    case SELECT_HAND_CARD:
      state.hand.splice(action.handIndex, 1)
      return {
        ...state,
        selectedHandCard: {
          ...state.selectedHandCard,
          id: action.cardId,
          instance: action.cardInstance,         
          handIndex: action.handIndex
        }
      }
    case CANCEL_SELECT_HAND_CARD:
      handIndex = state.selectedHandCard.handIndex
      state.hand.splice(handIndex, 0, { 
        id: state.selectedHandCard.id,
        instance: state.selectedHandCard.instance
      })
      state.selectedHandCard = {
        id: null,
        instance: null,
        handIndex: null
      }
      return state
    case PLAY_SELECTED_HAND_CARD:
      cardId = state.selectedHandCard.id
      cardInstance = state.selectedHandCard.instance
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
          instance: null,
          handIndex: null
        }
      }
    case CANCEL_PLAY_SELECTED_HAND_CARD:
      handIndex = state.playFromHand.handIndex
      state.hand.splice(handIndex, 0, {
        id: state.playFromHand.id,
        instance: state.playFromHand.instance
      })
      state.playFromHand = {
        id: null,
        instance: null,
        handIndex: null
      }
      return state
    case PLACE_ON_PLAY_AREA:
      // @NOTE: need to temporarily add card back in hand so the helper function can find it.
      // the helper function will remove it in the end.
      state.hand.splice(state.playFromHand.handIndex, 0, {
        id: state.playFromHand.id,
        instance: state.playFromHand.instance
      })
      PlaceOnPlayAreaResults(state, action.playAreaIndex, state.playFromHand.handIndex)
      return {
        ...state,
        playFromHand: {
          id: null,
          instance: null,
          handIndex: null
        }
      }
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
          instance: null,
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
          instance: null,
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
          instance: null,
          playAreaIndex: null
        }
      }
    case ATTACK_CARD:
      AttackOpponentCardResults(state, state.playFromPlayArea.playAreaIndex, action.playAreaIndex)
      return {
        ...state,
        playFromPlayArea: {
          id: null,
          instance: null,
          playAreaIndex: null
        }
      }
    case CLEAR_HAND:
      ResetDiscardedHand(state.hand, state.cards)
      return {
        ...state,
        hand: []
      }
    case SET_HAND:
      return {
        ...state,
        hand: action.hand,
        deckSize: action.deckSize,
        discardPileSize: action.discardPileSize,
        lostCardsSize: action.lostCardsSize
      }
    case REFRESH_CARDS:
      RefreshPlayerCards(state.cards, state.hand, state.playerField)
      return state
    case SET_CARDS:
      return {
        ...state,
        cards: action.cards
      }
    case SET_OPPONENT_FIELD:
      _addOpponentFieldCards(state, action.opponentFieldCards)
      return {
        ...state,
        opponentField: action.opponentField,
        opponentFieldBacklog: action.opponentFieldBacklog,
      }
    case SET_FIELD_FROM_OPPONENT_TURN:
      SetOpponentTurnResults(action.opponentTurn, state)
      return state
    case RESET_CARDS:
      return {
        ...state,
        opponentCards: {},
        hand: [],
        handSize: 5,
        deckSize: 0,
        discardPileSize: 0,
        lostCardsSize: 0,
        playerField: [
          {
            id: null,
            instance: null,      
          },
          {
            id: null,
            instance: null,      
          },
          {
            id: null,
            instance: null,      
          }
        ],
        opponentFieldBacklog: [
          0, 0, 0
        ],
        opponentField: [
          {
            id: null,
            instance: null,      
          },
          {
            id: null,
            instance: null,      
          },
          {
            id: null,
            instance: null,      
          }
        ]
      }
    default:
      return state;
  }
}

function _addOpponentFieldCards(state, cards) {
  for (let cardId in cards) {
    if (!(cardId in state.cards)) {
      state.opponentCards[cardId] = cards[cardId]
    }
    for (let cardInstance in cards[cardId].instances) {
      state.opponentCards[cardId].instances[cardInstance] = cards[cardId].instances[cardInstance]
    }
  }
}

export default app;
