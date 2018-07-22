import { 
  SHOW_IN_GAME_MENU,
  HIDE_IN_GAME_MENU } from '../actions/game.js';

const defaultState = {
  showMenu: false
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
    default:
      return state;
  }
}

export default app;
