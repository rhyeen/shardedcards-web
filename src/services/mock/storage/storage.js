import {default as initialCards} from './cards.js';
import {default as initialDeck} from './deck.js';
import {default as opponentBacklog} from './opponent-backlog.js';

const storage = {
  card: {
    cards: initialCards,
    deck: initialDeck,
    opponentBacklog: [
      opponentBacklog.leftOpponentBacklog,
      opponentBacklog.middleOpponentBacklog,
      opponentBacklog.rightOpponentBacklog
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