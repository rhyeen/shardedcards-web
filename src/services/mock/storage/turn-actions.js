import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../../../actions/card.js';

import {
  PlaceOnPlayAreaResults,
  AttackOpponentCardResults, 
  RefreshPlayerCards } from '../../../util/card.js';

import {default as storage} from './storage.js';

export const RecordPlayerTurn = (turn) => {
  for (let action in turn) {
    _recordPlayerAction(action)
  }
}

export const BeginPlayerTurn = () => {
  RefreshPlayerCards(storage.card.cards, storage.card.hand, storage.card.playerField)
}

const _recordPlayerAction = (action) => {
  switch(action) {
    case ATTACK_CARD:
      return _recordAttackCardAction(action)
    case PLACE_ON_PLAY_AREA:
      return _recordPlaceOnPlayAreaAction(action)
  }
}

const _recordAttackCardAction = (action) => {
  AttackOpponentCardResults(storage.card, action.playerFieldCardIndex, action.opponentFieldCardIndex)
}

const _recordPlaceOnPlayAreaAction = (action) => {
  PlaceOnPlayAreaResults(storage.card, action.playerFieldCardIndex, action.handCardIndex)
}

export const GetOpponentTurn = () => {
  return [
    {
      type: ATTACK_CARD,
      playerFieldCardIndex: 0,
      opponentFieldCardIndex: 1
    },
    {
      type: PLACE_ON_PLAY_AREA,
      playerFieldCardIndex: 0,
      handCardIndex: 4
    }
  ]
}
