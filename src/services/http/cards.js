import { BaseHttpGet } from './http.js';

export const CallHttpGetHand = () => {
  return BaseHttpGet('cardgroups/hand')
}

export const CallHttpGetCards = () => {
  return BaseHttpGet('cards')
}

export const CallHttpGetOpponentField = () => {
  return BaseHttpGet('cardgroups/opponentfield')
}