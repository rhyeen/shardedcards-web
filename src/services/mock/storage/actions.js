import {default as storage} from './storage.js';

export const InitializeCards = () => {
  ShuffleDrawDeck()
  RedrawHand()
  RefreshOpponentField()
}

export const ShuffleDrawDeck = () => {
  const deck = storage.card.deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

export const ShuffleDiscardIntoDrawDeck = () => {
  storage.card.deck.push.apply(storage.card.deck, storage.card.discardPile)
  storage.card.discardPile = []
  ShuffleDrawDeck()
}

export const RedrawHand = () => {
  storage.card.discardPile.push.apply(storage.card.discardPile, storage.card.hand)
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
  storage.card.hand.push.apply(storage.card.hand, newCards)
}

export const RefreshOpponentField = () => {
  _refreshOpponentField(0)
  _refreshOpponentField(1)
  _refreshOpponentField(2)
}

const _refreshOpponentField = (playFieldIndex)  => {
  if (storage.card.opponentField[playFieldIndex].id) {
    return
  }
  if (storage.card.opponentBacklog[playFieldIndex].length <= 0) {
    return
  }
  storage.card.opponentField[playFieldIndex] = storage.card.opponentBacklog[playFieldIndex].pop()
}