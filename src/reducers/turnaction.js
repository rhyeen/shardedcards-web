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
  let newState
  switch (action.type) {
    case ATTACK_CARD:
      newState = {
        ...state
      }
      newState.pendingTurn.push({
        type: action.type,
        playerFieldCardIndex: action.playerFieldCardIndex,
        opponentFieldCardIndex: action.opponentFieldCardIndex
      })
      return newState
    case PLACE_ON_PLAY_AREA:
      newState = {
        ...state
      }
      newState.pendingTurn.push({
        type: action.type,
        playerFieldCardIndex: action.playerFieldCardIndex,
        handCardIndex: action.handCardIndex
      })
      return newState
    default:
      return state;
  }
}

export default app;
