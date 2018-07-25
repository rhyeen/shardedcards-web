import { CallEndTurn } from '../services/turnaction.js';
import { CallGetHand, CallGetOpponentField } from '../services/card.js';
import { 
  SetHand,
  RefreshCards,
  SetOpponentField,
  SetFieldFromOpponentTurn } from './card.js';
import { 
  ResetEnergy,
  SetPlayerHealth } from './status.js';
import {
  LoseGame,
  WinGame } from './game.js';

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

export const RecordAttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => {
  return {
    type: RECORD_ATTACK_CARD,
    playerFieldCardIndex,
    opponentFieldCardIndex
  }
};

export const RecordPlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => {
  return {
    type: RECORD_PLACE_ON_PLAY_AREA,
    playerFieldCardIndex,
    handCardIndex
  }
};

export const RecordCastFromHand = (cardId, cardInstance, handCardIndex) => {
  return {
    type: RECORD_CAST_FROM_HAND,
    handCardIndex,
    cardId,
    cardInstance
  }
};

export const RecordCastFromPlayArea = (cardId, cardInstance, playerFieldCardIndex) => {
  return {
    type: RECORD_CAST_FROM_PLAY_AREA,
    playerFieldCardIndex,
    cardId,
    cardInstance
  }
};

export const RecordCastAbilityEnergize = (abilityId) => {
  return {
    type: RECORD_CAST_ABILITY_ENERGIZE,
    abilityId
  }
};

export const BeginTurn = () => {
  return {
    type: BEGIN_TURN
  }
}

export const EndTurn = (turn) => (dispatch) => {
  dispatch(_endTurn(turn))
  CallEndTurn(turn)
    .then(results => {
      dispatch(SetPlayerHealth(results.remainingPlayerHealth))
      if (results.remainingPlayerHealth <= 0) {
        dispatch(LoseGame())
      }
      dispatch(SetFieldFromOpponentTurn(results.opponentTurn))
      dispatch(AppendOpponentHistory(results.opponentTurn))
      dispatch(AppendPlayerHistory(turn))
      dispatch(BeginTurn())
      dispatch(ResetEnergy())
      dispatch(RefreshCards())
      CallGetHand()
      .then(hand => dispatch(SetHand(hand)))
      .catch(err => console.error(err))
      CallGetOpponentField()
      .then(result => {
        dispatch(SetOpponentField(result))
        if (!result.opponentField[0].id && !result.opponentField[1].id && !result.opponentField[2].id) {
          dispatch(WinGame())
        }
      })
      .catch(err => console.error(err))
    })
    .catch(err => {
      console.error(err)
      dispatch(AppendPlayerHistory(turn))
      dispatch(BeginTurn())
      dispatch(ResetEnergy())
      dispatch(RefreshCards())
    })
}

const _endTurn = () => {
  return {
    type: END_TURN
  }
}

export const AppendPlayerHistory = (turn) => {
  return {
    type: APPEND_PLAYER_HISTORY,
    turn
  }
}

export const AppendOpponentHistory = (turn) => {
  return {
    type: APPEND_OPPONENT_HISTORY,
    turn
  }
}

export const ResetTurns = () => {
  return {
    type: RESET_TURNS
  }
}