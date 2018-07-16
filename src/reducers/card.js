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
  SET_OPPONENT_FIELD } from '../actions/card.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../data/card-rarity.js';

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
  hand: [],
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
    },
  ]
}

const app = (state = defaultState, action) => {
  let handIndex
  let cardId
  let cardInstance
  let card
  let attackedCard
  let attackingCard
  let replacingCard
  let replacedCard
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
      cardId = state.playFromHand.id
      cardInstance = state.playFromHand.instance
      replacingCard = getCard(state, cardId, cardInstance)
      cardId = state.playerField[action.playAreaIndex].id
      if (cardId) {
        cardInstance = state.playerField[action.playAreaIndex].instance
        replacedCard = getCard(state, cardId, cardInstance)
      } else {
        replacedCard = null
      }
      GetReplacingCardResults(replacingCard, replacedCard, true)
      state.playerField[action.playAreaIndex] = {
        id: state.playFromHand.id,
        instance: state.playFromHand.instance
      }
      state.playFromHand = {
        id: null,
        instance: null,
        handIndex: null
      }
      return state
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
      cardId = state.playerField[state.playFromPlayArea.playAreaIndex].id
      cardInstance = state.playerField[state.playFromPlayArea.playAreaIndex].instance
      attackingCard = getCard(state, cardId, cardInstance)
      cardId = state.opponentField[action.playAreaIndex].id
      cardInstance = state.opponentField[action.playAreaIndex].instance
      attackedCard = getCard(state, cardId, cardInstance)
      GetAttackedCardResults(attackingCard, attackedCard, true)
      GetAttackingCardResults(attackingCard, attackedCard, true)
      if (attackedCard.health <= 0) {
        state.opponentField[action.playAreaIndex] = {
          id: null,
          instance: null
        }
      }
      if (attackingCard.health <= 0) {
        state.playerField[state.playFromPlayArea.playAreaIndex] = {
          id: null,
          instance: null
        }
      }
      return {
        ...state,
        playFromPlayArea: {
          id: null,
          instance: null,
          playAreaIndex: null
        }
      }
    case CLEAR_HAND:
      return {
        ...state,
        hand: []
      }
    case SET_HAND:
      return {
        ...state,
        hand: action.hand
      }
    case REFRESH_CARDS:
      for (cardId in state.cards) {
        card = state.cards[cardId]
        for (cardInstance in card.instances) {
          card.instances[cardInstance].conditions.exhausted = false
          card.instances[cardInstance].conditions.shield = 0
          card.instances[cardInstance].version += 1
        }
      }
      return state
    case SET_CARDS:
      return {
        ...state,
        cards: action.cards
      }
    case SET_OPPONENT_FIELD:
      return {
        ...state,
        opponentField: action.opponentField,
        opponentFieldBacklog: action.opponentFieldBacklog
      }
    default:
      return state;
  }
}

function getCard(state, cardId, cardInstance) {
  return state.cards[cardId].instances[cardInstance]
}

export function GetAttackingCardResults(attacking, attacked, modifyOriginals) {
  if (!modifyOriginals) {
    const _attacking = _getAttackResults(attacked, attacking, modifyOriginals)
    _attacking.conditions.exhausted = true
    return _attacking
  } else {
    _setAttackResults(attacked, attacking)
    attacking.conditions.exhausted = true
    return
  }
}

function _getAttackResults(attacking, attacked) {
  const _attacked = {
    ...attacked,
    conditions: {
      ...attacked.conditions
    }
  }
  _setAttackResults(attacking, _attacked)
  return _attacked
}

function _setAttackResults(attacking, attacked) {
  if (!attacked.conditions.shield) {
    attacked.conditions.shield = 0
  }
  if (attacked.conditions.shield >= attacking.attack) {
    attacked.conditions.shield -= attacking.attack
  } else {
    attacked.health -= attacking.attack - attacked.conditions.shield
    attacked.conditions.shield = 0
  }
  attacked.version += 1
}

export function GetAttackedCardResults(attacking, attacked, modifyOriginals) {
  if (!modifyOriginals) {
    return _getAttackResults(attacking, attacked, modifyOriginals)
  } else {
    return _setAttackResults(attacking, attacked)    
  }
}

export function GetReplacingCardResults(replacing, replaced, modifyOriginals) {
  if (!modifyOriginals) {
    return _getReplaceResults(replacing, replaced)
  } else {
    return _setReplaceResults(replacing, replaced)
  }
}

function _getReplaceResults(replacing, replaced) {
  const _replacing = {
    ...replacing,
    conditions: {
      ...replacing.conditions
    }
  }
  _setReplaceResults(_replacing, replaced)
  return _replacing
}

function _setReplaceResults(replacing, replaced) {
  if (replaced) {
    let shield = replaced.health
    if (replaced.conditions.shield) {
      shield += replaced.conditions.shield
    }
    if (replacing.conditions.shield) {
      replacing.conditions.shield += shield
    } else {
      replacing.conditions.shield = shield
    }
  }
  replacing.conditions.exhausted = true
  replacing.version += 1
}

export default app;
