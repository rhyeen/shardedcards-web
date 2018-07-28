import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../../../actions/domains/card.js';

import {
  PlaceOnPlayAreaResults,
  AttackOpponentCardResults, 
  RefreshPlayerCards } from '../../../util/card.js';

import { 
  GetOpponentTurnResults,
  SetOpponentTurnResults } from '../../../util/opponent-turn.js';


import {default as storage} from './storage.js';

export const RecordPlayerTurn = (turn) => {
  console.log("BEFORE RECORD PLAYER TURN")
  console.log(JSON.parse(JSON.stringify(storage.card)))
  for (let action of turn) {
    _recordPlayerAction(action)
  }
  console.log("AFTER RECORD PLAYER TURN")
  console.log(JSON.parse(JSON.stringify(storage.card)))
}

export const InitializeStatus = () => {
  storage.status  = {
    energy: {
      max: 10,
      current: 10
    },
    health: {
      max: 20,
      current: 20
    }
  }
}

export const RecordOpponentTurn = (turn) => {
  return SetOpponentTurnResults(turn, storage.card, storage.status)
}

export const BeginPlayerTurn = () => {
  RefreshPlayerCards(storage.card.cards, storage.card.hand, storage.card.playerField)
  console.log(JSON.parse(JSON.stringify(storage.card)))
}

const _recordPlayerAction = (action) => {
  switch(action.type) {
    case ATTACK_CARD:
      return _recordAttackCardAction(action)
    case PLACE_ON_PLAY_AREA:
      return _recordPlaceOnPlayAreaAction(action)
    default:
      console.error(`Unexpected action type: ${action.type}`)
  }
}

const _recordAttackCardAction = (action) => {
  AttackOpponentCardResults(storage.card, action.playerFieldCardIndex, action.opponentFieldCardIndex)
}

const _recordPlaceOnPlayAreaAction = (action) => {
  PlaceOnPlayAreaResults(storage.card, action.playerFieldCardIndex, action.handCardIndex, storage.status)
}

export const GetOpponentTurn = () => {
  return GetOpponentTurnResults(storage.card)
}