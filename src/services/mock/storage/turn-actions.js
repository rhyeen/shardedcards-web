import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA } from '../../../actions/card.js';

import {
  GetAttackingCardResults,
  GetAttackedCardResults } from '../../../reducers/card.js';

import {default as storage} from './storage.js';

export const RecordPlayerTurn = (turn) => {
  for (action in turn) {
    _recordPlayerAction(action)
  }
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
  const opponentCard = _getOpponentFieldCard(action.opponentFieldCardIndex)
  const playerCard = _getPlayerFieldCard(action.playerFieldCardIndex)
  if (!_playerCardCanAttackOpponent(playerCard, action.playerFieldCardIndex, action.opponentFieldCardIndex)) {
    return
  }
  GetAttackedCardResults(playerCard, opponentCard, true)
  GetAttackingCardResults(playerCard, opponentCard, true)
}

const _getOpponentFieldCard = (playFieldIndex) => {
  if (!_validFieldIndex(playFieldIndex)) {
    console.error(`Invalid opponentFieldCardIndex: ${playFieldIndex}`)
    return
  }
  const cardId = storage.card.opponentField[playFieldIndex].id
  const cardInstance = storage.card.opponentField[playFieldIndex].instance
  if (!cardId) {
    console.error(`card at opponentFieldCardIndex: ${playFieldIndex} does not exist`)
    return
  }
  return storage.card.opponentCards[cardId].instances[cardInstance]
}

const _getPlayerFieldCard = (playFieldIndex) => {
  if (!_validFieldIndex(playFieldIndex)) {
    console.error(`Invalid playerFieldCardIndex: ${playFieldIndex}`)
    return
  }
  const cardId = storage.card.playerField[playFieldIndex].id
  const cardInstance = storage.card.playerField[playFieldIndex].instance
  if (!cardId) {
    console.error(`card at playerFieldCardIndex: ${playFieldIndex} does not exist`)
    return
  }
  return storage.card.cards[cardId].instances[cardInstance]
}

const _validFieldIndex = (playFieldIndex) => {
  return playFieldIndex === 0 || playFieldIndex === 1 || playFieldIndex === 2
}

const _playerCardCanAttackOpponent = (playerCard, playerFieldCardIndex, opponentFieldCardIndex) => {
  const distance = Math.abs(playerFieldCardIndex - opponentFieldCardIndex)
  if (distance > playerCard.range) {
    console.error(`Opponent is out of reach for attack`)
    return false
  }
  if (playerCard.conditions.exhausted) {
    return false
  }
  return true
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
