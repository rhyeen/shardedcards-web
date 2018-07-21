import {default as initialCards} from './cards.js';
import {default as initialDeck} from './deck.js';
import {default as opponentCards} from './opponent-cards.js';

const storage = {
  status: {
    energy: {
      max: 0,
      current: 0
    },
    health: {
      max: 0,
      current: 0
    }
  },
  card: {
    cards: initialCards,
    deck: initialDeck,
    opponentCards,
    opponentBacklog: [
      [], [], []
    ],
    discardPile: [],
    hand: [],
    handSize: 5,
    opponentField: [
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
    ],
    playerField: [
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
}

export default storage