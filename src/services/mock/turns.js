import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../../actions/card.js';

import { 
  DebugRequest,
  DebugSuccessfulResponse,
  POST_CALLBACK_TIME } from './mock.js';

export const CallMockEndTurn = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockEndTurn, turn)
    setTimeout(() => {
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
