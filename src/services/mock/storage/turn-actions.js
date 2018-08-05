import {
  ATTACK_CARD,
  PLACE_ON_PLAY_AREA,
  CAST_CARD_FROM_HAND } from '../../../actions/domains/card.js';

import {
  PlaceOnPlayAreaResults,
  AttackOpponentCardResults, 
  RefreshPlayerCards,
  GetCardFromHand,
  GetCardIdInstanceFromHand,
  DiscardCardFromHand,
  UseCardAbility,
  CastEnergizeAbility,
  CastSpellshotAbility,
  CastReachAbility } from '../../../util/card.js';

import { 
  GetOpponentTurnResults,
  SetOpponentTurnResults } from '../../../util/opponent-turn.js';

import { ABILITY_ENERGIZE, ABILITY_SPELLSHOT, ABILITY_REACH } from '../../../util/card-constants.js';

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
    case CAST_CARD_FROM_HAND:
      return _recordCastCardFromHand(action)
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

const _recordCastCardFromHand = (action) => {
  if (!_canCastFromHand(action.handCardIndex, action.abilities)) {
    return
  }
  const { cardId, cardInstance } = GetCardIdInstanceFromHand(storage.card, action.handCardIndex)
  for (let ability of action.abilities) {
    UseCardAbility(storage.card.cards, cardId, cardInstance, ability.id)
    switch(ability.id) {
      case ABILITY_ENERGIZE:
        return CastEnergizeAbility(storage.card, cardId, cardInstance, ability.id, storage.status)
      case ABILITY_SPELLSHOT:
        return CastSpellshotAbility(storage.card, cardId, cardInstance, ability.id, ability.opponentFieldCardIndex)
      case ABILITY_REACH:
        return CastReachAbility(storage.card, cardId, cardInstance, ability.id, ability.playerFieldCardIndex)
      default:
        console.error(`Unexpected ability type: ${ability.id}`)
    }
  }
  DiscardCardFromHand(storage.card, action.handCardIndex)
}

const _canCastFromHand = (handCardIndex, abilities) => {
  const card = _deepCopy(GetCardFromHand(storage.card, handCardIndex))
  if (!card) {
    console.error(`Hand does not have a card at: ${handCardIndex}`)
    return false
  }
  if (!card.abilities || card.abilities.length === 0) {
    console.error(`Hand card at: ${handCardIndex} does not have any abilities`)
    return false
  }
  for (let searchingForAbility of abilities) {
    let foundAbility = false
    for (let searchingInAbility of card.abilities) {
      if (searchingForAbility.id === searchingInAbility.id) {
        if (searchingInAbility.used) {
          console.error(`Hand card at: ${handCardIndex} cannot reuse the ability: ${searchingForAbility.id}`)
          return false
        }
        searchingInAbility.used = 1
        foundAbility = true
        break
      }
    }
    if (!foundAbility) {
      console.error(`Hand card at: ${handCardIndex} does not have the ability: ${searchingForAbility.id}`)
      return false
    }
  }
  return true
}

function _deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const GetOpponentTurn = () => {
  return GetOpponentTurnResults(storage.card)
}