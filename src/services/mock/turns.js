import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../../actions/card.js';

import { 
  DebugRequest,
  DebugSuccessfulResponse,
  POST_CALLBACK_TIME } from './mock.js';

import {
  RedrawHand } from './storage/actions.js'; 

import { InitializeCards } from './storage/actions.js';

export const CallMockEndTurn = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockEndTurn, turn)
    setTimeout(() => {
      RedrawHand()
      const response = [
        {
          type: ATTACK_CARD,
          playerFieldCardIndex: 0,
          opponentFieldCardIndex: 1
        },
        {
          type: PLACE_ON_PLAY_AREA,
          playerFieldCardIndex: 0,
          handCardIndex: 4
        }
      ]
      DebugSuccessfulResponse(CallMockEndTurn, response)
      resolve(response)
    }, POST_CALLBACK_TIME)
  })
}

export const CallMockStartGame = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockStartGame)
    setTimeout(() => {
      InitializeCards()
      DebugSuccessfulResponse(CallMockStartGame)
      resolve()
    }, POST_CALLBACK_TIME)
  })
}