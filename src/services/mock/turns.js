import { 
  DebugRequest,
  DebugSuccessfulResponse,
  PrepareResponse,
  POST_CALLBACK_TIME } from './mock.js';

import { 
  RedrawHand,
  InitializeCards } from './storage/card-actions.js';

import {
  RecordPlayerTurn, 
  GetOpponentTurn } from './storage/turn-actions.js';

export const CallMockEndTurn = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockEndTurn, turn)
    setTimeout(() => {
      RedrawHand()
      RecordPlayerTurn(turn)
      const opponentTurn = GetOpponentTurn()
      DebugSuccessfulResponse(CallMockEndTurn, opponentTurn)
      resolve(PrepareResponse(opponentTurn))
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