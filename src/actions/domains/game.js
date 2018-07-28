export const SHOW_IN_GAME_MENU = 'SHOW_IN_GAME_MENU';
export const HIDE_IN_GAME_MENU = 'HIDE_IN_GAME_MENU';
export const RESET_GAME = 'RESET_GAME';
export const WIN_GAME = 'WIN_GAME';
export const LOSE_GAME = 'LOSE_GAME';

export const showInGameMenu = () => {
  return {
    type: SHOW_IN_GAME_MENU
  }
};

export const hideInGameMenu = () => {
  return {
    type: HIDE_IN_GAME_MENU
  }
};

export const resetGame = () => (dispatch) => {
  return {
    type: RESET_GAME
  }
};

export const winGame = () => {
  return {
    type: WIN_GAME
  }
}

export const loseGame = () => {
  return {
    type: LOSE_GAME
  }
}
