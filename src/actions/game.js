export const SHOW_IN_GAME_MENU = 'SHOW_IN_GAME_MENU';
export const HIDE_IN_GAME_MENU = 'HIDE_IN_GAME_MENU';

export const ShowInGameMenu = () => {
  return {
    type: SHOW_IN_GAME_MENU
  }
};

export const HideInGameMenu = () => {
  return {
    type: HIDE_IN_GAME_MENU
  }
};

export const ResetGame = () => {
  console.log('@TODO: ResetGame')
};
