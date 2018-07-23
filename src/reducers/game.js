import { 
  SHOW_IN_GAME_MENU,
  HIDE_IN_GAME_MENU,
  RESET_GAME,
  WIN_GAME,
  LOSE_GAME } from '../actions/game.js';

export const GAME_STATE_PLAYING = 'playing';
export const GAME_STATE_LOSE = 'lose';
export const GAME_STATE_WIN = 'win';

const defaultState = {
  showMenu: false,
  gameState: GAME_STATE_PLAYING
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_IN_GAME_MENU:
      return {
        ...state,
        showMenu: true
      }
    case HIDE_IN_GAME_MENU:
      return {
        ...state,
        showMenu: false
      }
    case RESET_GAME:
      return {
        ...state,
        gameState: GAME_STATE_PLAYING
      }
    case WIN_GAME:
      return {
        ...state,
        gameState: GAME_STATE_WIN
      }
    case LOSE_GAME:
      return {
        ...state,
        gameState: GAME_STATE_LOSE
      }
    default:
      return state;
  }
}

export default app;
