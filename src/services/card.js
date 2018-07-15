import {
  INTERFACE_HTTP,
  INTERFACE_MOCK,
  InterfaceState,
  InvalidInterfaceState } from './service-state.js';

import {
  CallHttpGetHand } from './http/cards.js';

import {
  CallMockGetHand } from './mock/cards.js';

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