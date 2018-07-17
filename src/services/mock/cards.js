import { 
  DebugRequest,
  DebugSuccessfulResponse,
  GET_CALLBACK_TIME } from './mock.js';

import {default as storage} from './storage/storage.js';
import {
  GetOpponentField,
  GetOpponentFieldCards } from './storage/actions.js';

export const CallMockGetHand = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetHand, turn)
    setTimeout(() => {
      const response = storage.card.hand
      DebugSuccessfulResponse(CallMockGetHand, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}

export const CallMockGetOpponentField = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetOpponentField)
    setTimeout(() => {
      const response = {
        opponentField: GetOpponentField(),
        opponentFieldBacklog: [
          storage.card.opponentBacklog[0].length,
          storage.card.opponentBacklog[1].length,
          storage.card.opponentBacklog[2].length
        ],
        opponentFieldCards: GetOpponentFieldCards()
      }
      DebugSuccessfulResponse(CallMockGetOpponentField, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}

export const CallMockGetCards = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetCards)
    setTimeout(() => {
      const response = storage.card.cards
      DebugSuccessfulResponse(CallMockGetCards, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}