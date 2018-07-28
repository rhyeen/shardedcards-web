import {
  CallStartGame } from '../../services/turnaction.js';

import { 
  CallGetCards,
  CallGetHand,
  CallGetOpponentField } from '../../services/card.js';

import {
  setStatus } from './status.js';

import {
  resetCards,
  setCards,
  setHand,
  setOpponentField } from './card.js';

import {
  resetTurns } from './turnaction.js';

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
  dispatch(_resetGame())
  CallStartGame()
  .then((initialGame) => {
    dispatch(setStatus(initialGame.status))
    dispatch(resetCards())
    dispatch(resetTurns())
    Promise.all([CallGetCards(), CallGetHand(), CallGetOpponentField()])
    .then(results => {
      dispatch(setCards(results[0]))
      dispatch(setHand(results[1]))
      dispatch(setOpponentField(results[2]))
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => console.error(err))
};

const _resetGame = () => {
  return {
    type: RESET_GAME
  }
}

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
