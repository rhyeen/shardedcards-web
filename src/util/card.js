import { ModifyEnergy } from "./status.js";
import { ABILITY_HASTE, ABILITY_SPELLSHOT, ABILITY_REACH } from "./card-constants.js";

export function GetAttackingPlayerResults(opponentCard) {
  opponentCard.conditions.exhausted = true
  return opponentCard.attack
}

export function GetAttackingCardResults(attacking, attacked, modifyOriginals = false) {
  if (!modifyOriginals) {
    const _attacking = _getAttackResults(attacked, attacking, modifyOriginals)
    _attacking.conditions.exhausted = true
    return _attacking
  } else {
    _setDamageResults(attacked.attack, attacking)
    attacking.conditions.exhausted = true
    return
  }
}

function _getAttackResults(attacking, attacked) {
  const _attacked = {
    ...attacked,
    conditions: {
      ...attacked.conditions
    }
  }
  _setDamageResults(attacking.attack, _attacked)
  return _attacked
}

function _setDamageResults(damage, target) {
  if (!target.conditions.shield) {
    target.conditions.shield = 0
  }
  if (target.conditions.shield >= damage) {
    target.conditions.shield -= damage
  } else {
    target.health -= damage - target.conditions.shield
    target.conditions.shield = 0
  }
  target.version += 1
}

export function GetAttackedCardResults(attacking, attacked, modifyOriginals = false) {
  if (!modifyOriginals) {
    return _getAttackResults(attacking, attacked, modifyOriginals)
  } else {
    return _setDamageResults(attacking.attack, attacked)    
  }
}

export function GetReplacingCardResults(replacing, replaced, modifyOriginals = false) {
  if (!modifyOriginals) {
    return _getReplaceResults(replacing, replaced)
  } else {
    return _setReplaceResults(replacing, replaced)
  }
}

function _getReplaceResults(replacing, replaced) {
  const _replacing = {
    ...replacing,
    conditions: {
      ...replacing.conditions
    }
  }
  _setReplaceResults(_replacing, replaced)
  return _replacing
}

function _setReplaceResults(replacing, replaced) {
  if (replaced) {
    let shield = replaced.health
    if (replaced.conditions.shield) {
      shield += replaced.conditions.shield
    }
    if (replacing.conditions.shield) {
      replacing.conditions.shield += shield
    } else {
      replacing.conditions.shield = shield
    }
  }
  if (!_hasHaste(replacing)) {
    replacing.conditions.exhausted = true
  }
  replacing.version += 1
}

function _hasHaste(card) {
  return !!GetAbility(card, ABILITY_HASTE);
}

export const GetAbility = (card, abilityId) => {
  if (!card.abilities) {
    return null
  }
  for (let ability of card.abilities) {
    if (ability.id === abilityId) {
      return ability
    }
  }
  return null
}

export function RefreshPlayerCards(cards, hand, playerField) {
  for (let card in hand) {
    _refreshCard(cards, card.id, card.instance)
  }
  for (let card of playerField) {
    _refreshCard(cards, card.id, card.instance)    
  }
}

function _refreshCard(cards, cardId, cardInstance) {
  let card = GetCard(cards, cardId, cardInstance)
  if (!card) {
    return
  }
  card.conditions.exhausted = false
  card.conditions.shield = 0
  card.version += 1
  if (card.abilities) {
    for (let ability of card.abilities) {
      ability.used = 0
    }
  }
}

export function GetCard(cards, cardId, cardInstance) {
  if (!cardId || !cards[cardId] || !cards[cardId].instances) {
    return null
  }
  return cards[cardId].instances[cardInstance]
}

export function GetParentCard(cards, cardId) {
  if (!cardId) {
    return null
  }
  return cards[cardId]
}

export function RefreshOpponentCards(cards, opponentField) {
  for (let card of opponentField) {
    _refreshCard(cards, card.id, card.instance)    
  }
}

export function ResetCard(cards, cardId, cardInstance) {
  let card = GetCard(cards, cardId, cardInstance)
  let parentCard = GetParentCard(cards, cardId)
  if (!card) {
    return
  }
  card.conditions.exhausted = false
  card.conditions.shield = 0
  card.version += 1
  card.health = parentCard.health
  card.attack = parentCard.attack
  card.range = parentCard.range
  card.cost = parentCard.cost
  if (parentCard.abilities) {
    card.abilities = _deepCopy(parentCard.abilities)
  } else if (card.abilities) {
    delete card.abilities
  }
}

function _deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Returns true if a play area card was replaced (aka discarded).
 */
export function PlaceOnPlayAreaResults(state, playerFieldCardIndex, handCardIndex, status = null) {
  const handCard = GetCardFromHand(state, handCardIndex)
  if (status) {
    if (_canAffordCard(handCard, status)) {
      _payForCard(handCard, status)
    }
  }
  const playerCard = _getPlayerFieldCard(state, playerFieldCardIndex, true)
  GetReplacingCardResults(handCard, playerCard, true)
  const cardId = state.playerField[playerFieldCardIndex].id
  const cardInstance = state.playerField[playerFieldCardIndex].instance
  const replacedCard = AddCardToDiscardPile(state, cardId, cardInstance)
  state.playerField[playerFieldCardIndex] = {
    id: state.hand[handCardIndex].id,
    instance: state.hand[handCardIndex].instance
  }
  state.hand.splice(handCardIndex, 1)
  return replacedCard
}

export function _canAffordCard(card, status) {
  return card.cost <= status.energy.current
}

export function _payForCard(card, status) {
  status.energy.current -= card.cost
}

/**
 * Returns true if the player's card was killed (aka discarded).
 */
export function AttackOpponentCardResults(state, playerFieldCardIndex, opponentFieldCardIndex) {
  const opponentCard = _getOpponentFieldCard(state, opponentFieldCardIndex)
  const playerCard = _getPlayerFieldCard(state, playerFieldCardIndex)
  if (!_playerCardCanAttackOpponent(playerCard, playerFieldCardIndex, opponentFieldCardIndex)) {
    return
  }
  GetAttackedCardResults(playerCard, opponentCard, true)
  GetAttackingCardResults(playerCard, opponentCard, true)
  return _setAttackFieldRemovalResults(state, opponentCard, playerCard, opponentFieldCardIndex, playerFieldCardIndex)
}

function _setAttackFieldRemovalResults(state, opponentCard, playerCard, opponentFieldCardIndex, playerFieldCardIndex) {
  if (opponentCard.health <= 0) {
    const cardId = state.opponentField[opponentFieldCardIndex].id
    const cardInstance = state.opponentField[opponentFieldCardIndex].instance
    ResetCard(state.opponentCards, cardId, cardInstance)
    state.opponentField[opponentFieldCardIndex] = {
      id: null,
      instance: null
    }
  }
  if (playerCard.health <= 0) {
    const cardId = state.playerField[playerFieldCardIndex].id
    const cardInstance = state.playerField[playerFieldCardIndex].instance
    AddCardToDiscardPile(state, cardId, cardInstance)
    state.playerField[playerFieldCardIndex] = {
      id: null,
      instance: null
    }
    return true
  }
  return false
}

export function AttackPlayerCardResults(state, playerFieldCardIndex, opponentFieldCardIndex) {
  const opponentCard = _getOpponentFieldCard(state, opponentFieldCardIndex)
  const playerCard = _getPlayerFieldCard(state, playerFieldCardIndex)
  GetAttackedCardResults(opponentCard, playerCard, true)
  GetAttackingCardResults(opponentCard, playerCard, true)
  _setAttackFieldRemovalResults(state, opponentCard, playerCard, opponentFieldCardIndex, playerFieldCardIndex)
}

export function AttackPlayerResults(state, opponentFieldCardIndex, status) {
  if (!status) {
    return
  }
  const opponentCard = _getOpponentFieldCard(state, opponentFieldCardIndex)
  status.health.current -= opponentCard.attack
  if (status.health.current <= 0) {
    status.health.current = 0
  }
}

export const AddCardToDiscardPile = (state, cardId, cardInstance) => {
  if (!cardId) {
    return false
  }
  ResetCard(state.cards, cardId, cardInstance)
  if (state.discardPile) {
    state.discardPile.push({
      id: cardId,
      instance: cardInstance
    })
  }
  return true
}

export const GetCardFromHand = (state, handCardIndex) => {
  const { cardId, cardInstance } = GetCardIdInstanceFromHand(state, handCardIndex)
  return state.cards[cardId].instances[cardInstance]
}

export const GetCardIdInstanceFromHand = (state, handCardIndex) => {
  if (!_validHandCardIndex(state, handCardIndex)) {
    console.error(`Invalid handCardIndex: ${handCardIndex}`)
    return null
  }
  const cardId = state.hand[handCardIndex].id
  const cardInstance = state.hand[handCardIndex].instance
  if (!cardId) {
    console.error(`card at handCardIndex: ${handCardIndex} does not exist`)
    return null
  }
  return { cardId, cardInstance }
}

export const DiscardCardFromHand = (state, handCardIndex) => {
  const { cardId, cardInstance } = GetCardIdInstanceFromHand(state, handCardIndex)  
  AddCardToDiscardPile(state, cardId, cardInstance)
  state.hand.splice(handCardIndex, 1)
}

const _validHandCardIndex = (state, handCardIndex) => {
  return (!!handCardIndex || handCardIndex === 0) && handCardIndex >= 0 && handCardIndex <= state.handSize
}

const _getOpponentFieldCard = (state, playFieldIndex) => {
  if (!_validFieldIndex(playFieldIndex)) {
    console.error(`Invalid opponentFieldCardIndex: ${playFieldIndex}`)
    return null
  }
  const cardId = state.opponentField[playFieldIndex].id
  const cardInstance = state.opponentField[playFieldIndex].instance
  if (!cardId) {
    console.error(`card at opponentFieldCardIndex: ${playFieldIndex} does not exist`)
    return null
  }
  return state.opponentCards[cardId].instances[cardInstance]
}

const _getPlayerFieldCard = (state, playFieldIndex, canBeMissing = false) => {
  if (!_validFieldIndex(playFieldIndex)) {
    console.error(`Invalid playerFieldCardIndex: ${playFieldIndex}`)
    return null
  }
  const cardId = state.playerField[playFieldIndex].id
  const cardInstance = state.playerField[playFieldIndex].instance
  if (!cardId) {
    if (!canBeMissing) {
      console.error(`card at playerFieldCardIndex: ${playFieldIndex} does not exist`)
    }
    return null
  }
  return state.cards[cardId].instances[cardInstance]
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

export const ResetDiscardedHand = (hand, cards) => {
  for (let card of hand) {
    ResetCard(cards, card.id, card.instance)
  }
}

export const UseCardAbility = (cards, cardId, cardInstance, abilityId) => {
  const card = GetCard(cards, cardId, cardInstance)
  const ability = GetCardAbility(cards, cardId, cardInstance, abilityId)
  if (!ability) {
    return
  }
  if (!ability.used) {
    ability.used = 0
  }
  ability.used += 1
  card.version += 1
}

export const GetCardAbility = (cards, cardId, cardInstance, abilityId) => {
  const card = GetCard(cards, cardId, cardInstance)
  if (!card.abilities) {
    console.error(`Card ${cardId}::${cardInstance} does not have any abilities.`)
    return null
  }
  for (let ability of card.abilities) {
    if (ability.id === abilityId) {
      return ability
    }
  }
  console.error(`Card ${cardId}::${cardInstance} does not have the ability: ${abilityId}.`)
  return null
}

export const CastEnergizeAbility = (state, cardId, cardInstance, abilityId, status) => {
  const ability = GetCardAbility(state.cards, cardId, cardInstance, abilityId)
  ModifyEnergy(status, ability.amount, ability.amount)
}

export const CastSpellshotAbility = (state, cardId, cardInstance, abilityId, opponentFieldCardIndex) => {
  const caster = GetCard(state.cards, cardId, cardInstance)
  const ability = GetAbility(caster, abilityId)
  CastOnTargetedOpponentCardResults(state, caster, ability, opponentFieldCardIndex)
}

export const CastReachAbility = (state, cardId, cardInstance, abilityId, playerFieldCardIndex) => {
  const caster = GetCard(state.cards, cardId, cardInstance)
  const ability = GetAbility(caster, abilityId)
  CastOnTargetedUnitCardResults(state, caster, ability, playerFieldCardIndex)
}

export function CastOnTargetedOpponentCardResults(state, caster, ability, opponentFieldCardIndex) {
  if (!_abilityCardCanCastOnOpponent(state, caster, ability.id, opponentFieldCardIndex)) {
    return
  }
  const target = _getOpponentFieldCard(state, opponentFieldCardIndex)
  GetCastOnTargetedCardResults(caster, ability, target, true)
  _setCastOnOpponentRemovalResults(state, target, opponentFieldCardIndex)
}

export function CastOnTargetedUnitCardResults(state, caster, ability, playerFieldCardIndex) {
  if (!_abilityCardCanCastOnUnit(state, caster, ability.id, playerFieldCardIndex)) {
    return
  }
  const target = _getPlayerFieldCard(state, playerFieldCardIndex)
  GetCastOnTargetedCardResults(caster, ability, target, true)
}

function _abilityCardCanCastOnOpponent(state, caster, abilityId, opponentFieldCardIndex) {
  const ability = GetAbility(caster, abilityId)
  if (!ability) {
    console.error(`Card does not have ability: ${abilityId}`)
    return false
  }
  if (!state.opponentField[opponentFieldCardIndex].id) {
    console.error(`Cannot cast ability ${abilityId} on an empty opponent slot`)
    return false
  }
  if (!_abilityCanTargetOpponent(abilityId)) {
    console.error(`Ability ${abilityId} cannot target opponent cards`)
    return false
  }
  return true
}

function _abilityCardCanCastOnUnit(state, caster, abilityId, playerFieldCardIndex) {
  const ability = GetAbility(caster, abilityId)
  if (!ability) {
    console.error(`Card does not have ability: ${abilityId}`)
    return false
  }
  if (!state.playerField[playerFieldCardIndex].id) {
    console.error(`Cannot cast ability ${abilityId} on an empty unit slot`)
    return false
  }
  if (!_abilityCanTargetUnit(abilityId)) {
    console.error(`Ability ${abilityId} cannot target unit cards`)
    return false
  }
  return true
}

function _abilityCanTargetOpponent(abilityId) {
  switch (abilityId) {
    case ABILITY_SPELLSHOT:
      return true
    default:
      return false
  }
}

function _abilityCanTargetUnit(abilityId) {
  switch (abilityId) {
    case ABILITY_REACH:
      return true
    default:
      return false
  }
}

export const GetCastOnTargetedCardResults = (caster, ability, target, modifyOriginals = false) => {
  if (modifyOriginals) {
    return _castOnTargetedCardResults(caster, ability, target)
  } else {
    const newCaster = _deepCopy(caster)
    const newTarget = _deepCopy(target)
    const newAbility = GetAbility(newCaster, ability.id)
    return _castOnTargetedCardResults(newCaster, newAbility, newTarget)
  }
}

function _castOnTargetedCardResults(caster, ability, target) {
  switch (ability.id) {
    case ABILITY_SPELLSHOT:
      return _getSpellshotTargetedCardResults(ability, target)
    case ABILITY_REACH:
      return _getReachTargetedCardResults(ability, target)
    default:
      console.error(`Unexpected ability ${ability.id} on targeted card`)
      return target
  }
}

function _getSpellshotTargetedCardResults(ability, target) {
  _setDamageResults(ability.amount, target)
  return target
}

export const _setCastOnOpponentRemovalResults = (state, opponentCard, opponentFieldCardIndex) => {
  if (opponentCard.health <= 0) {
    const cardId = state.opponentField[opponentFieldCardIndex].id
    const cardInstance = state.opponentField[opponentFieldCardIndex].instance
    ResetCard(state.opponentCards, cardId, cardInstance)
    state.opponentField[opponentFieldCardIndex] = {
      id: null,
      instance: null
    }
  }
}

function _getReachTargetedCardResults(ability, target) {
  _setRangeResults(ability.amount, target)
  return target
}

function _setRangeResults(rangeModifier, target) {
  target.range += rangeModifier
  target.version += 1
}