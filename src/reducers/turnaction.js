import { 
  RECORD_ATTACK_CARD,
  RECORD_PLACE_ON_PLAY_AREA } from '../actions/turnaction.js';


export const FIRST_TURN_PLAYER = 'player';
export const FIRST_TURN_OPPONENT = 'opponent';

const defaultState = {
  pendingTurn: [],
  firstTurn: FIRST_TURN_PLAYER,
  playerHistory: [],
  opponentHistory: []
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case RECORD_ATTACK_CARD:
      state.pendingTurn.push({
        type: action.type,
        playerFieldCardIndex: action.playerFieldCardIndex,
        opponentFieldCardIndex: action.opponentFieldCardIndex
      })
      return state
    case RECORD_PLACE_ON_PLAY_AREA:
      state.pendingTurn.push({
        type: action.type,
        playerFieldCardIndex: action.playerFieldCardIndex,
        handCardIndex: action.handCardIndex
      })
      return state
    default:
      return state;
  }
}

export default app;
