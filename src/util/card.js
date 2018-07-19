
export function GetAttackingCardResults(attacking, attacked, modifyOriginals) {
  if (!modifyOriginals) {
    const _attacking = _getAttackResults(attacked, attacking, modifyOriginals)
    _attacking.conditions.exhausted = true
    return _attacking
  } else {
    _setAttackResults(attacked, attacking)
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
  _setAttackResults(attacking, _attacked)
  return _attacked
}

function _setAttackResults(attacking, attacked) {
  if (!attacked.conditions.shield) {
    attacked.conditions.shield = 0
  }
  if (attacked.conditions.shield >= attacking.attack) {
    attacked.conditions.shield -= attacking.attack
  } else {
    attacked.health -= attacking.attack - attacked.conditions.shield
    attacked.conditions.shield = 0
  }
  attacked.version += 1
}

export function GetAttackedCardResults(attacking, attacked, modifyOriginals) {
  if (!modifyOriginals) {
    return _getAttackResults(attacking, attacked, modifyOriginals)
  } else {
    return _setAttackResults(attacking, attacked)    
  }
}

export function GetReplacingCardResults(replacing, replaced, modifyOriginals) {
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
  replacing.conditions.exhausted = true
  replacing.version += 1
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
  return !cards[cardId]
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
  card.verison += 1
  card.health = parentCard.health
  card.attack = parentCard.attack
  card.range = parentCard.range
  card.cost = parentCard.cost
}

export function PlaceOnPlayAreaResults(state, playerFieldCardIndex, handCardIndex) {
  const handCard = _getHandCard(state, handCardIndex)
  const playerCard = _getPlayerFieldCard(state, playerFieldCardIndex, true)
  GetReplacingCardResults(handCard, playerCard, true)
  const cardId = state.playerField[playerFieldCardIndex].id
  const cardInstance = state.playerField[playerFieldCardIndex].instance
  ResetCard(state.cards, cardId, cardInstance)
  state.playerField[playerFieldCardIndex] = {
    id: state.hand[handCardIndex].id,
    instance: state.hand[handCardIndex].instance
  }
  state.hand.splice(handCardIndex, 1)
}

export function AttackOpponentCardResults(state, playerFieldCardIndex, opponentFieldCardIndex) {
  const opponentCard = _getOpponentFieldCard(state, opponentFieldCardIndex)
  const playerCard = _getPlayerFieldCard(state, playerFieldCardIndex)
  if (!_playerCardCanAttackOpponent(playerCard, playerFieldCardIndex, opponentFieldCardIndex)) {
    return
  }
  GetAttackedCardResults(playerCard, opponentCard, true)
  GetAttackingCardResults(playerCard, opponentCard, true)
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
    ResetCard(state.cards, cardId, cardInstance)
    state.playerField[playerFieldCardIndex] = {
      id: null,
      instance: null
    }
  }
}

const _getHandCard = (state, handCardIndex) => {
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
  return state.cards[cardId].instances[cardInstance]
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