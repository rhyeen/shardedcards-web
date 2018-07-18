import { CallEndTurn } from '../services/turnaction.js';
import { CallGetHand, CallGetOpponentField } from '../services/card.js';
import { 
  SetHand,
  RefreshCards,
  SetOpponentField } from './card.js';
import { ResetEnergy } from './status.js';

export const RECORD_ATTACK_CARD = 'RECORD_ATTACK_CARD';
export const RECORD_PLACE_ON_PLAY_AREA = 'RECORD_PLACE_ON_PLAY_AREA';
export const BEGIN_TURN = 'BEGIN_TURN';
export const END_TURN = 'END_TURN';
export const APPEND_PLAYER_HISTORY = 'APPEND_PLAYER_HISTORY';
export const APPEND_OPPONENT_HISTORY = 'APPEND_OPPONENT_HISTORY';

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

export const BeginTurn = () => {
  return {
    type: BEGIN_TURN
  }
}

export const EndTurn = (turn) => (dispatch) => {
  dispatch(_endTurn(turn))
  CallEndTurn(turn)
    .then(opponentsTurn => {
      dispatch(AppendOpponentHistory(opponentsTurn))
      dispatch(AppendPlayerHistory(turn))
      dispatch(BeginTurn())
      dispatch(ResetEnergy())
      dispatch(RefreshCards())
      CallGetHand()
      .then(hand => dispatch(SetHand(hand)))
      .catch(err => console.error(err))
      CallGetOpponentField()
      .then(opponentField => dispatch(SetOpponentField(opponentField)))
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