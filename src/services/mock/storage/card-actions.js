import {default as storage} from './storage.js';

import {default as initialCards} from './cards.js';
import {default as initialDeck} from './deck.js';
import {default as opponentCards} from './opponent-cards.js';

import {
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../../../util/card-rarity.js';

import {
  RefreshOpponentCards, ResetDiscardedHand } from '../../../util/card.js';

export const OPPONENT_BACKLOG_COMMON_SIZE = 12;
export const OPPONENT_BACKLOG_RARE_SIZE = 8;
export const OPPONENT_BACKLOG_EPIC_SIZE = 4;
export const OPPONENT_BACKLOG_LEGENDARY_SIZE = 1;
export const CHANCE_OF_NEXT_LEVEL_CARD = 0.3;

export const GetOpponentField = () => {
  RefreshOpponentField()
  return storage.card.opponentField
}

export const GetOpponentFieldCards = () => {
  const cards = {}
  _setOpponentFieldCardInstance(cards, 0)
  _setOpponentFieldCardInstance(cards, 1)
  _setOpponentFieldCardInstance(cards, 2)
  return cards
}

const _setOpponentFieldCardInstance = (cards, playFieldIndex) => {
  _setCardInstance(cards, storage.card.opponentField[playFieldIndex], storage.card.opponentCards)
}

const _setCardInstance = (cards, idInstance, catalog) => {
  const cardId = idInstance.id
  const cardInstance = idInstance.instance
  if (!cards[cardId]) {
    cards[cardId] = JSON.parse(JSON.stringify(catalog[cardId]))
    cards[cardId].instances = {}
  }
  cards[cardId].instances[cardInstance] = JSON.parse(JSON.stringify(catalog[cardId].instances[cardInstance]))
}

export const InitializeCards = () => {
  ResetCards()
  PrepareOpponentFieldBacklogs()
  ShuffleDrawDeck()
  RefreshOpponentField()
}

export const ResetCards = () => {
  storage.card.cards = JSON.parse(JSON.stringify(initialCards))
  storage.card.deck = JSON.parse(JSON.stringify(initialDeck))
  storage.card.opponentCards = JSON.parse(JSON.stringify(opponentCards))
  storage.card.opponentBacklog = [
    [], [], []
  ]
  storage.card.discardPile = []
  storage.card.hand = []
  storage.card.handSize = 5
  storage.card.opponentField = [
    {
      id: null,
      instance: null
    },
    {
      id: null,
      instance: null
    },
    {
      id: null,
      instance: null
    }
  ]
  storage.card.playerField = [
    {
      id: null,
      instance: null
    },
    {
      id: null,
      instance: null
    },
    {
      id: null,
      instance: null
    }
  ]
}

export const PrepareOpponentFieldBacklogs = () => {
  _prepareOpponentFieldBacklog(0)
  _prepareOpponentFieldBacklog(1)
  _prepareOpponentFieldBacklog(2)
}

const _prepareOpponentFieldBacklog = (playFieldIndex) => {
  const backlog = []
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITY_COMMON, OPPONENT_BACKLOG_COMMON_SIZE, playFieldIndex))
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITY_RARE, OPPONENT_BACKLOG_RARE_SIZE, playFieldIndex))
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITY_EPIC, OPPONENT_BACKLOG_EPIC_SIZE, playFieldIndex))
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITY_LEGENDARY, OPPONENT_BACKLOG_LEGENDARY_SIZE, playFieldIndex))
  storage.card.opponentBacklog[playFieldIndex] = backlog
  _addOpponentFieldInstancesToOpponentCards(playFieldIndex)
}

/**
 * playFieldIndex is used to ensure all fields (0, 1, 2) have different instance numbers for the same cards.
 */
const _getOpponentCardsByRarity = (rarity, size, playFieldIndex) => {
  const instanceOffset = size * playFieldIndex
  const cards = []
  const cardsByLevel = _getOpponentCardsByRarityThenLevel(rarity)
  const cardsPerLevel = Math.ceil(size / cardsByLevel.levels.length)
  const cardsInLastLevel = size - (cardsPerLevel * (cardsByLevel.levels.length - 1))
  for (let level of cardsByLevel.levels) {
    if (_lastLevelInRarity(level, cardsByLevel)) {
      for (let i = 0; i < cardsInLastLevel; i++) {
        cards.push(_getOpponentCard(cardsByLevel.cards[level]))
      }
    } else {
      for (let i = 0; i < cardsPerLevel; i++) {
        if (_increaseCardLevel()) {
          cards.push(_getOpponentCard(cardsByLevel.cards[parseInt(level) + 1]))
        } else {
          cards.push(_getOpponentCard(cardsByLevel.cards[level]))
        }
      }
    }
  }
  return _getIdsAndInstances(cards, instanceOffset)
}

const _lastLevelInRarity = (level, cardsByLevel) => {
  return level === cardsByLevel.levels[cardsByLevel.levels.length - 1]
}

const _increaseCardLevel = () => {
  return Math.random() <= CHANCE_OF_NEXT_LEVEL_CARD;
}

const _getOpponentCard = (opponentCards) => {
  return _getRandomArrayElement(opponentCards)
}

const _getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const _getIdsAndInstances = (cards, instanceOffset) => {
  const cardIds = {}
  const instances = []
  for (let card of cards) {
    if (!(card.id in cardIds)) {
      cardIds[card.id] = instanceOffset
    }
    instances.push({
      id: card.id,
      instance: cardIds[card.id]
    })
    cardIds[card.id] += 1
  }
  return instances
}

const _getOpponentCardsByRarityThenLevel = (rarity) => {
  const cardsByLevel = {
    levels: [],
    cards: {}
  }
  for (let cardId in storage.card.opponentCards) {
    let card = storage.card.opponentCards[cardId]
    if (card.rarity !== rarity) {
      continue
    }
    card.id = cardId
    let level = card.level
    if (!(level in cardsByLevel.cards)) {
      cardsByLevel.cards[level] = []
    }
    cardsByLevel.cards[level].push(card)
  }
  for (let level in cardsByLevel.cards) {
    cardsByLevel.levels.push(level)
  }
  cardsByLevel.levels.sort()
  return cardsByLevel
}

const _addOpponentFieldInstancesToOpponentCards = (playFieldIndex) => {
  for (let fieldCard of storage.card.opponentBacklog[playFieldIndex]) {
    _addInstanceToCard(storage.card.opponentCards, fieldCard.id, fieldCard.instance)
  }
}

const _addInstanceToCard = (cards, cardId, cardInstance) => {
  if (!cards[cardId].instances) {
    cards[cardId].instances = {}
  }
  cards[cardId].instances[cardInstance] = JSON.parse(JSON.stringify(cards[cardId]))
  cards[cardId].instances[cardInstance].conditions = {}
  cards[cardId].instances[cardInstance].version = 0
  delete cards[cardId].instances[cardInstance].instances
}

export const ShuffleDrawDeck = () => {
  const deck = storage.card.deck
  _shuffleArray(deck)
}

const _shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export const ShuffleDiscardIntoDrawDeck = () => {
  storage.card.deck.push(...storage.card.discardPile)
  storage.card.discardPile = []
  ShuffleDrawDeck()
}

export const RedrawHand = () => {
  ResetDiscardedHand(storage.card.hand, storage.card.cards)
  storage.card.discardPile.push(...storage.card.hand)
  storage.card.hand = []
  DrawCards(storage.card.handSize)
}

export const DrawCards = (amount) => {
  const remainingDeckCards = storage.card.deck.length
  if (remainingDeckCards < amount) {
    _drawCards(remainingDeckCards)
    ShuffleDiscardIntoDrawDeck()
    _drawCards(amount - remainingDeckCards)
  } else {
    _drawCards(amount)
  }
}

const _drawCards = (amount) => {
  const newCards = storage.card.deck.splice(0, amount)
  storage.card.hand.push(...newCards)
}

export const RefreshOpponentField = () => {
  _refreshOpponentField(0)
  _refreshOpponentField(1)
  _refreshOpponentField(2)
  RefreshOpponentCards(storage.card.opponentCards, storage.card.opponentField)
}

const _refreshOpponentField = (playFieldIndex)  => {
  if (storage.card.opponentField[playFieldIndex].id) {
    return
  }
  if (storage.card.opponentBacklog[playFieldIndex].length <= 0) {
    return
  }
  storage.card.opponentField[playFieldIndex] = storage.card.opponentBacklog[playFieldIndex].shift()
}