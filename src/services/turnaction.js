import {
  INTERFACE_HTTP,
  INTERFACE_MOCK,
  InterfaceState } from './service-state.js';

import {
  CallHttpEndTurn,
  CallHttpStartGame } from './http/turns.js';

import {
  CallMockEndTurn,
  CallMockStartGame } from './mock/turns.js';

export const CallEndTurn = (turn) => {
  switch(InterfaceState()) {
    case INTERFACE_HTTP:
      return CallHttpEndTurn(turn)
    case INTERFACE_MOCK:
      return CallMockEndTurn(turn)
    default:
      return InvalidInterfaceState()
  }
}

export const CallStartGame = () => {
  switch(InterfaceState()) {
    case INTERFACE_HTTP:
      return CallHttpStartGame()
    case INTERFACE_MOCK:
      return CallMockStartGame()
    default:
      return InvalidInterfaceState()
  }
}