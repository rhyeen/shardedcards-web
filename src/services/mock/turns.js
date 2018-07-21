import {default as storage} from './storage/storage.js';

import { 
  DebugRequest,
  DebugSuccessfulResponse,
  PrepareResponse,
  POST_CALLBACK_TIME } from './mock.js';

import { 
  InitializeCards } from './storage/card-actions.js';

import {
  RecordPlayerTurn, 
  GetOpponentTurn,
  InitializeStatus,
  RecordOpponentTurn } from './storage/turn-actions.js';

export const CallMockEndTurn = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockEndTurn, turn)
    setTimeout(() => {
      RecordPlayerTurn(turn)
      const opponentTurn = GetOpponentTurn()
      const remainingPlayerHealth = RecordOpponentTurn(opponentTurn)
      const results = {
        opponentTurn,
        remainingPlayerHealth
      }
      DebugSuccessfulResponse(CallMockEndTurn, results)
      resolve(PrepareResponse(results))
    }, POST_CALLBACK_TIME)
  })
}

export const CallMockStartGame = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockStartGame)
    setTimeout(() => {
      InitializeCards()
      InitializeStatus()
      const initialGame = {
        status: storage.status
      }
      DebugSuccessfulResponse(CallMockStartGame, initialGame)
      resolve(PrepareResponse(initialGame))
    }, POST_CALLBACK_TIME)
  })
}