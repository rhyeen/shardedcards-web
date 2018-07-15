import {
  INTERFACE_HTTP,
  INTERFACE_MOCK,
  InterfaceState,
  InvalidInterfaceState } from './service-state.js';

import {
  CallHttpGetHand,
  CallHttpGetCards,
  CallHttpGetOpponentField } from './http/cards.js';

import {
  CallMockGetHand,
  CallMockGetCards,
  CallMockGetOpponentField } from './mock/cards.js';

export const CallGetHand = () => {
  switch(InterfaceState()) {
    case INTERFACE_HTTP:
      return CallHttpGetHand()
    case INTERFACE_MOCK:
      return CallMockGetHand()
    default:
      return InvalidInterfaceState()
  }
}

export const CallGetCards = () => {
  switch(InterfaceState()) {
    case INTERFACE_HTTP:
      return CallHttpGetCards()
    case INTERFACE_MOCK:
      return CallMockGetCards()
    default:
      return InvalidInterfaceState()
  }
}

export const CallGetOpponentField = () => {
  switch(InterfaceState()) {
    case INTERFACE_HTTP:
      return CallHttpGetOpponentField()
    case INTERFACE_MOCK:
      return CallMockGetOpponentField()
    default:
      return InvalidInterfaceState()
  }
}