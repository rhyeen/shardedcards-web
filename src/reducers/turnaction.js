import { 
  RECORD_ATTACK_CARD,
  RECORD_PLACE_ON_PLAY_AREA, 
  END_TURN,
  APPEND_PLAYER_HISTORY,
  APPEND_OPPONENT_HISTORY, 
  BEGIN_TURN} from '../actions/turnaction.js';

import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../actions/card.js';


export const FIRST_TURN_PLAYER = 'player';
export const FIRST_TURN_OPPONENT = 'opponent';

const defaultState = {
  pendingTurn: [],
  firstTurn: FIRST_TURN_PLAYER,
  playersTurn: false,
  playerHistory: [],
  opponentHistory: []
}

defaultState.playersTurn = defaultState.firstTurn === FIRST_TURN_PLAYER

const app = (state = defaultState, action) => {
  switch (action.type) {
    case RECORD_ATTACK_CARD:
      state.pendingTurn.push({
        type: ATTACK_CARD,
        playerFieldCardIndex: action.playerFieldCardIndex,
        opponentFieldCardIndex: action.opponentFieldCardIndex
      })
      return state
    case RECORD_PLACE_ON_PLAY_AREA:
      state.pendingTurn.push({
        type: PLACE_ON_PLAY_AREA,
        playerFieldCardIndex: action.playerFieldCardIndex,
        handCardIndex: action.handCardIndex
      })
      return state
    case END_TURN:
      return {
        ...state,
        playersTurn: false
      }
    case BEGIN_TURN:
      return {
        ...state,
        pendingTurn: [],
        playersTurn: true
      }
    case APPEND_PLAYER_HISTORY:
      state.playerHistory.push(action.turn)
      return state
    case APPEND_OPPONENT_HISTORY:
      state.opponentHistory.push(action.turn)
      return state
    default:
      return state;
  }
}

export default app;
