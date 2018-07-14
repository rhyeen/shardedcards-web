import { 
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../actions/turnaction.js';


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
    case ATTACK_CARD:
      state.pendingTurn.push({
        type: action.type,
        playerFieldCardIndex: action.playerFieldCardIndex,
        opponentFieldCardIndex: action.opponentFieldCardIndex
      })
      return state
    case PLACE_ON_PLAY_AREA:
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
