import { CallEndTurn } from '../../services/turnaction.js';
import { CallGetHand, CallGetOpponentField } from '../../services/card.js';
import { 
  setHand,
  refreshCards,
  setOpponentField,
  setFieldFromOpponentTurn } from './card.js';
import { 
  resetEnergy,
  setPlayerHealth } from './status.js';
import {
  loseGame,
  winGame } from './game.js';

export const RECORD_ATTACK_CARD = 'RECORD_ATTACK_CARD';
export const RECORD_PLACE_ON_PLAY_AREA = 'RECORD_PLACE_ON_PLAY_AREA';
export const BEGIN_TURN = 'BEGIN_TURN';
export const END_TURN = 'END_TURN';
export const APPEND_PLAYER_HISTORY = 'APPEND_PLAYER_HISTORY';
export const APPEND_OPPONENT_HISTORY = 'APPEND_OPPONENT_HISTORY';
export const RESET_TURNS = 'RESET_TURNS';
export const RECORD_CAST_FROM_HAND = 'RECORD_CAST_FROM_HAND';
export const RECORD_CAST_FROM_PLAY_AREA = 'RECORD_CAST_FROM_PLAY_AREA';
export const RECORD_CAST_ABILITY_ENERGIZE = 'RECORD_CAST_ABILITY_ENERGIZE';

export const recordAttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => {
  return {
    type: RECORD_ATTACK_CARD,
    playerFieldCardIndex,
    opponentFieldCardIndex
  }
};

export const recordPlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => {
  return {
    type: RECORD_PLACE_ON_PLAY_AREA,
    playerFieldCardIndex,
    handCardIndex
  }
};

export const recordCastFromHand = (cardId, cardInstance, handCardIndex) => {
  return {
    type: RECORD_CAST_FROM_HAND,
    handCardIndex,
    cardId,
    cardInstance
  }
};

export const recordCastFromPlayArea = (cardId, cardInstance, playerFieldCardIndex) => {
  return {
    type: RECORD_CAST_FROM_PLAY_AREA,
    playerFieldCardIndex,
    cardId,
    cardInstance
  }
};

export const recordCastAbilityEnergize = (abilityId) => {
  return {
    type: RECORD_CAST_ABILITY_ENERGIZE,
    abilityId
  }
};

export const beginTurn = () => {
  return {
    type: BEGIN_TURN
  }
}

export const endTurn = (turn) => (dispatch) => {
  dispatch(_endTurn(turn))
  CallEndTurn(turn)
    .then(results => {
      dispatch(setPlayerHealth(results.remainingPlayerHealth))
      if (results.remainingPlayerHealth <= 0) {
        dispatch(loseGame())
      }
      dispatch(setFieldFromOpponentTurn(results.opponentTurn))
      dispatch(appendOpponentHistory(results.opponentTurn))
      dispatch(appendPlayerHistory(turn))
      dispatch(beginTurn())
      dispatch(resetEnergy())
      dispatch(refreshCards())
      CallGetHand()
      .then(hand => dispatch(setHand(hand)))
      .catch(err => console.error(err))
      CallGetOpponentField()
      .then(result => {
        dispatch(setOpponentField(result))
        if (!result.opponentField[0].id && !result.opponentField[1].id && !result.opponentField[2].id) {
          dispatch(winGame())
        }
      })
      .catch(err => console.error(err))
    })
    .catch(err => {
      console.error(err)
      dispatch(appendPlayerHistory(turn))
      dispatch(beginTurn())
      dispatch(resetEnergy())
      dispatch(refreshCards())
    })
}

const _endTurn = () => {
  return {
    type: END_TURN
  }
}

export const appendPlayerHistory = (turn) => {
  return {
    type: APPEND_PLAYER_HISTORY,
    turn
  }
}

export const appendOpponentHistory = (turn) => {
  return {
    type: APPEND_OPPONENT_HISTORY,
    turn
  }
}

export const resetTurns = () => {
  return {
    type: RESET_TURNS
  }
}