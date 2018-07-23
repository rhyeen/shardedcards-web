import {
  CallStartGame } from '../services/turnaction.js';

import { 
  CallGetCards,
  CallGetHand,
  CallGetOpponentField } from '../services/card.js';

import {
  SetStatus } from './status.js';

import {
  ResetCards,
  SetCards,
  SetHand,
  SetOpponentField } from './card.js';

import {
  ResetTurns } from './turnaction.js';

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

export const ResetGame = () => (dispatch) => {
  CallStartGame()
  .then((initialGame) => {
    dispatch(SetStatus(initialGame.status))
    dispatch(ResetCards())
    dispatch(ResetTurns())
    Promise.all([CallGetCards(), CallGetHand(), CallGetOpponentField()])
    .then(results => {
      dispatch(SetCards(results[0]))
      dispatch(SetHand(results[1]))
      dispatch(SetOpponentField(results[2]))
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => console.error(err))
};
