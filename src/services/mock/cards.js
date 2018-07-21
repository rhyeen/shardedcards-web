import { 
  DebugRequest,
  DebugSuccessfulResponse,
  PrepareResponse,
  GET_CALLBACK_TIME } from './mock.js';

import {default as storage} from './storage/storage.js';
import {
  GetOpponentField,
  GetOpponentFieldCards,
  RedrawHand } from './storage/card-actions.js';

import {
  BeginPlayerTurn } from './storage/turn-actions.js';

export const CallMockGetHand = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetHand, turn)
    setTimeout(() => {
      // @NOTE: may not be the best spot to refresh the player cards, but it needs to happen at
      // the beginning of the player's turn.
      RedrawHand()      
      BeginPlayerTurn()
      const response = {
        hand: storage.card.hand,
        deckSize: storage.card.deck.length,
        discardPileSize: storage.card.discardPile.length,
        lostCardsSize: 0
      }
      DebugSuccessfulResponse(CallMockGetHand, response)
      resolve(PrepareResponse(response))
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
      resolve(PrepareResponse(response))
    }, GET_CALLBACK_TIME)
  })
}

export const CallMockGetCards = () => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetCards)
    setTimeout(() => {
      const response = storage.card.cards
      DebugSuccessfulResponse(CallMockGetCards, response)
      resolve(PrepareResponse(response))
    }, GET_CALLBACK_TIME)
  })
}