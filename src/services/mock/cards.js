import { 
  DebugRequest,
  DebugSuccessfulResponse,
  GET_CALLBACK_TIME } from './mock.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../../data/card-rarity.js';

export const CallMockGetHand = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetHand, turn)
    setTimeout(() => {
      const response = [
        {
          id: 'test',
          instance: '0'
        },
        {
          id: 'hero',
          instance: '1'
        },
        {
          id: 'pawn',
          instance: '0'
        },
        {
          id: 'monster',
          instance: '0'
        },
        {
          id: 'beast',
          instance: '1'
        }
      ]
      DebugSuccessfulResponse(CallMockGetHand, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}

export const CallMockGetOpponentField = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetOpponentField)
    setTimeout(() => {
      const response = [
        {
          id: null,
          instance: null,      
        },
        {
          id: 'beast',
          instance: '0',      
        },
        {
          id: 'monster',
          instance: '1'
        }
      ]
      DebugSuccessfulResponse(CallMockGetOpponentField, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}

export const CallMockGetCards = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetCards)
    setTimeout(() => {
      const response = {
        test: {
          title: 'Hello World',
          rarity: CARD_RARITY_COMMON,
          cost: 3,
          range: 1,
          health: 5,
          attack: 3,
          instances: {
            '0': {
              title: 'Hello World',
              rarity: CARD_RARITY_COMMON,
              cost: 3,
              range: 1,
              health: 5,
              attack: 3,
              version: 0,
              conditions: {
                shield: 2
              }
            },
            '1': {
              title: 'Hello World',
              rarity: CARD_RARITY_COMMON,
              cost: 3,
              range: 1,
              health: 5,
              attack: 3,
              version: 0,
              conditions: {}
            }
          }
        },
        beast: {
          title: 'Beast within',
          rarity: CARD_RARITY_RARE,
          cost: 6,
          range: 2,
          health: 5,
          attack: 2,
          instances: {
            '0': {
              title: 'Beast within',
              rarity: CARD_RARITY_RARE,
              cost: 6,
              range: 2,
              health: 5,
              attack: 2,
              version: 0,
              conditions: {}
            },
            '1': {
              title: 'Beast within',
              rarity: CARD_RARITY_RARE,
              cost: 6,
              range: 2,
              health: 5,
              attack: 2,
              version: 0,
              conditions: {}
            }
          }
        },
        hero: {
          title: 'Hero within',
          rarity: CARD_RARITY_EPIC,
          cost: 0,
          range: 3,
          health: 5,
          attack: 3,
          instances: {
            '0': {
              title: 'Hero within',
              rarity: CARD_RARITY_EPIC,
              cost: 0,
              range: 3,
              health: 5,
              attack: 3,
              version: 0,
              conditions: {}
            },
            '1': {
              title: 'Hero within',
              rarity: CARD_RARITY_EPIC,
              cost: 0,
              range: 3,
              health: 5,
              attack: 3,
              version: 0,
              conditions: {}
            }
          }
        },
        monster: {
          title: 'Monster within',
          rarity: CARD_RARITY_LEGENDARY,
          cost: 1,
          range: 1,
          health: 5,
          attack: 3,
          instances: {
            '0': {
              title: 'Monster within',
              rarity: CARD_RARITY_LEGENDARY,
              cost: 1,
              range: 1,
              health: 5,
              attack: 3,
              version: 0,
              conditions: {}
            },
            '1': {
              title: 'Monster within',
              rarity: CARD_RARITY_LEGENDARY,
              cost: 1,
              range: 1,
              health: 5,
              attack: 5,
              version: 0,
              conditions: {}
            }
          }
        },
        pawn: {
          title: 'Pawn within',
          rarity: CARD_RARITY_UNDEFINED,
          cost: 3,
          range: 1,
          health: 1,
          attack: 4,
          instances: {
            '0': {
              title: 'Pawn within',
              rarity: CARD_RARITY_UNDEFINED,
              cost: 3,
              range: 1,
              health: 1,
              attack: 4,
              version: 0,
              conditions: {}
            }
          }
        }
      }
      DebugSuccessfulResponse(CallMockGetCards, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}