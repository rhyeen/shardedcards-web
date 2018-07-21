import { 
  GetCard,
  GetAttackedCardResults,
  GetAttackingCardResults,
  GetAttackingPlayerResults,
  AttackPlayerCardResults,
  AttackPlayerResults } from './card.js';

import { 
  ATTACK_CARD,
  ATTACK_PLAYER } from '../actions/card.js';

const MAX_LOOP_ITERATIONS = 10;

export const GetOpponentTurnResults = (state) => {
  // @NOTE: we're going to update the state as we go to keep track of killed cards and exhausted states,
  // but we don't actually want to update the real state.
  state = JSON.parse(JSON.stringify(state))
  const opponentPlayOrder = _getOpponentTurnPlayOrder(state)
  const actions = []
  for (let playFieldIndex of opponentPlayOrder) {
    let cardActions = _getOpponentCardActions(state, playFieldIndex)
    actions.push(...cardActions)
  }
  return actions
}

function _getOpponentTurnPlayOrder(state) {
  // @TODO: check if card is "aggressive" or "cautious".  An aggressive card tries to go first
  // a cautious card tries to go last.
  return _opponentCardsOnField(state)
}

function _opponentCardsOnField(state) {
  const fieldIndicesWithCards = []
  if (_opponentCardOnFieldIndex(state, 0)) {
    fieldIndicesWithCards.push(0)
  }
  if (_opponentCardOnFieldIndex(state, 1)) {
    fieldIndicesWithCards.push(1)
  }
  if (_opponentCardOnFieldIndex(state, 2)) {
    fieldIndicesWithCards.push(2)
  }
  return fieldIndicesWithCards
}

function _opponentCardOnFieldIndex(state, playFieldIndex) {
  return !!state.opponentField[playFieldIndex].id
}

function _getOpponentCardActions(state, playFieldIndex) {
  const actions = []
  let possibleTargets = []
  let bestPossibleTargets = []
  let iterations = 0
  while (true) {
    if (iterations > MAX_LOOP_ITERATIONS) {
      console.error('Stopped infinite loop')
      break
    }
    iterations += 1
    if (_isExhausted(state, playFieldIndex) || _isDead(state, playFieldIndex)) {
      break
    }
    if (_canAttackPlayer(state, playFieldIndex)) {
      actions.push(_attackPlayer(state, playFieldIndex))
      continue
    }
    // @TODO: if opponent card is "assassin", first check is _targetsThatCanBeKilled()
    // @NOTE: pretty sure we don't need because _targetsThatCanBeDealtMaxDamage
    // possibleTargets = _targetsThatCanBeDamaged(state, playFieldIndex)
    // if (possibleTargets.length === 0) {
    //   break
    // }
    // if (possibleTargets.length === 1) {
    //   actions.push(_attackTarget(state, playFieldIndex, possibleTargets[0]))
    //   continue
    // }
    // bestPossibleTargets = possibleTargets
    possibleTargets = _targetsThatCanBeDealtMaxDamage(state, playFieldIndex)
    if (possibleTargets.length === 0) {
      // @NOTE: pretty sure we don't need because _targetsThatCanBeDealtMaxDamage
      // actions.push(_attackRandomTarget(state, playFieldIndex, bestPossibleTargets))
      // continue
      break
    }
    if (possibleTargets.length === 1) {
      actions.push(_attackTarget(state, playFieldIndex, possibleTargets[0]))
      continue
    }
    bestPossibleTargets = possibleTargets
    possibleTargets = _targetsThatCanBeKilledAtMaxDamage(state, playFieldIndex, possibleTargets)
    if (possibleTargets.length === 0) {
      actions.push(_attackRandomTarget(state, playFieldIndex, bestPossibleTargets))
      continue
    }
    if (possibleTargets.length === 1) {
      actions.push(_attackTarget(state, playFieldIndex, possibleTargets[0]))
      continue
    }
    actions.push(_attackRandomTarget(state, playFieldIndex, possibleTargets))
  }
  return actions
}

function _isExhausted(state, playFieldIndex) {
  const cardId = state.opponentField[playFieldIndex].id
  const cardInstance = state.opponentField[playFieldIndex].instance
  const card = GetCard(state.opponentCards, cardId, cardInstance)
  return card.conditions.exhausted
}

function _isDead(state, playFieldIndex) {
  const cardId = state.opponentField[playFieldIndex].id
  const cardInstance = state.opponentField[playFieldIndex].instance
  const card = GetCard(state.opponentCards, cardId, cardInstance)
  return card.health <= 0
}

function _canAttackPlayer(state, playFieldIndex) {
  const inRangeTargets = _possibleTargetsInRange(state, playFieldIndex)
  for (let targetFieldIndex of inRangeTargets) {
    if (!_playerCardOnFieldIndex(state, targetFieldIndex)) {
      return true
    }
  }
  return false
}

function _possibleTargetsInRange(state, playFieldIndex) {
  const inRangeFieldIndices = []
  const cardId = state.opponentField[playFieldIndex].id
  const cardInstance = state.opponentField[playFieldIndex].instance
  const card = GetCard(state.opponentCards, cardId, cardInstance)
  if (card.conditions.exhausted) {
    return inRangeFieldIndices
  }
  if (_indexWithinRange(card.range, playFieldIndex, 0)) {
    inRangeFieldIndices.push(0)
  }
  if (_indexWithinRange(card.range, playFieldIndex, 1)) {
    inRangeFieldIndices.push(1)
  }
  if (_indexWithinRange(card.range, playFieldIndex, 2)) {
    inRangeFieldIndices.push(2)
  }
  return inRangeFieldIndices
}

function _indexWithinRange(range, playFieldIndex, targetFieldIndex) {
  return Math.abs(targetFieldIndex - playFieldIndex) < range
}

function _playerCardOnFieldIndex(state, playFieldIndex) {
  return !!state.playerField[playFieldIndex].id
}

function _attackPlayer(state, playFieldIndex) {
  const cardId = state.opponentField[playFieldIndex].id
  const cardInstance = state.opponentField[playFieldIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  GetAttackingPlayerResults(opponentCard)
  return {
    type: ATTACK_PLAYER,
    opponentFieldCardIndex: playFieldIndex
  }
}

// @NOTE: pretty sure we don't need because _targetsThatCanBeDealtMaxDamage
// already checks targets that can be damaged.
// function _targetsThatCanBeDamaged(state, playFieldIndex) {
//   const possibleTargets = []
//   const inRangeTargets = _possibleTargetsInRange(state, playFieldIndex)
//   for (let targetFieldIndex of inRangeTargets) {
//     if (_healthLostFromAttack(state, playFieldIndex, targetFieldIndex) > 0) {
//       possibleTargets.push(targetFieldIndex)
//     }
//   }
//   return possibleTargets
// }

function _healthLostFromAttack(state, playFieldIndex, targetFieldIndex) {
  let cardId = state.opponentField[playFieldIndex].id
  let cardInstance = state.opponentField[playFieldIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  const resultingPlayerCard = GetAttackedCardResults(opponentCard, playerCard)
  if (resultingPlayerCard.health < 0) {
    resultingPlayerCard.health = 0
  }
  return playerCard.health - resultingPlayerCard.health
}

function _attackTarget(state, playFieldIndex, targetFieldIndex) {
  let cardId = state.opponentField[playFieldIndex].id
  let cardInstance = state.opponentField[playFieldIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  GetAttackedCardResults(opponentCard, playerCard, true)
  GetAttackingCardResults(opponentCard, playerCard, true)
  return {
    type: ATTACK_CARD,
    playerFieldCardIndex: targetFieldIndex,
    opponentFieldCardIndex: playFieldIndex
  }
}

function _targetsThatCanBeDealtMaxDamage(state, playFieldIndex) {
  const possibleTargets = []
  const damageDealtPairings = []
  let maxDamage = 1
  const inRangeTargets = _possibleTargetsInRange(state, playFieldIndex)
  for (let targetFieldIndex of inRangeTargets) {
    let damageDealt = _healthLostFromAttack(state, playFieldIndex, targetFieldIndex)
    if (damageDealt >= maxDamage) {
      maxDamage = damageDealt
      possibleTargets.push(targetFieldIndex)
      damageDealtPairings.push(damageDealt)
    }
  }
  const possibleMaxDamageTargets = []
  for (let index of possibleTargets.keys()) {
    if (damageDealtPairings[index] === maxDamage) {
      possibleMaxDamageTargets.push(possibleTargets[index])
    }
  }
  return possibleMaxDamageTargets
}

function _attackRandomTarget(state, playFieldIndex, targetFieldIndices) {
  return _attackTarget(state, playFieldIndex, _getRandomItemFromArray(targetFieldIndices))
}

function _getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function _targetsThatCanBeKilledAtMaxDamage(state, playFieldIndex, possibleTargets) {
  const possibleKilledTargets = []
  for (let targetFieldIndex of possibleTargets) {
    if (_healthRemainingFromAttack(state, playFieldIndex, targetFieldIndex) <= 0) {
      possibleKilledTargets.push(targetFieldIndex)
    }
  }
  return possibleKilledTargets
}

function _healthRemainingFromAttack(state, playFieldIndex, targetFieldIndex) {
  let cardId = state.opponentField[playFieldIndex].id
  let cardInstance = state.opponentField[playFieldIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  const resultingPlayerCard = GetAttackedCardResults(opponentCard, playerCard)
  return resultingPlayerCard.health
}

export const SetOpponentTurnResults = (turn, state = null, status = null) => {
  for (let action of turn) {
    _recordOpponentAction(state, status, action)
  }
  if (!status) {
    return null
  }
  return status.health.current
}

const _recordOpponentAction = (state, status, action) => {
  switch(action.type) {
    case ATTACK_CARD:
      return _recordAttackPlayerCardAction(state, action)
    case ATTACK_PLAYER:
      return _recordAttackPlayerAction(state, status, action)
    default:
      console.error(`Unexpected action type: ${action.type}`)
  }
}

const _recordAttackPlayerCardAction = (state, action) => {
  AttackPlayerCardResults(state, action.playerFieldCardIndex, action.opponentFieldCardIndex)
}

const _recordAttackPlayerAction = (state, status, action) => {
  AttackPlayerResults(state, action.opponentFieldCardIndex, status)
}