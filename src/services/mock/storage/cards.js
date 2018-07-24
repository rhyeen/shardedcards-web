import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_STANDARD,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY,
  ENERGY_SHARD_CARD_ID,
  ENERGY_SHARD_CARD_INSTANCE,
  CARD_TYPE_UNIT,
  CARD_TYPE_INSTANT,
  ABILITY_ENERGIZE } from '../../../util/card-constants.js';

const cards = {
  hello: {
    title: 'Hello',
    type: CARD_TYPE_UNIT,
    rarity: CARD_RARITY_COMMON,
    cost: 3,
    range: 1,
    health: 5,
    attack: 3,
    instances: {
      '0': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '1': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '2': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '3': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '4': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '5': {
        title: 'Hello',
        type: CARD_TYPE_UNIT,
        rarity: CARD_RARITY_COMMON,
        cost: 3,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      }
    }
  },
  beast: {
    title: 'Beast',
    rarity: CARD_RARITY_RARE,
    cost: 6,
    range: 2,
    health: 5,
    attack: 2,
    instances: {
      '0': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      },
      '1': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      },
      '2': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      },
      '3': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      },
      '4': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      },
      '5': {
        title: 'Beast',
        rarity: CARD_RARITY_RARE,
        cost: 6,
        range: 2,
        health: 5,
        attack: 2,
        version: 0,
        conditions: {}
      }
    }
  },
  hero: {
    title: 'Hero',
    rarity: CARD_RARITY_EPIC,
    cost: 0,
    range: 3,
    health: 5,
    attack: 3,
    instances: {
      '0': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '1': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '2': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '3': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '4': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '5': {
        title: 'Hero',
        rarity: CARD_RARITY_EPIC,
        cost: 0,
        range: 3,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      }
    }
  },
  monster: {
    title: 'Monster',
    rarity: CARD_RARITY_LEGENDARY,
    cost: 1,
    range: 1,
    health: 5,
    attack: 3,
    instances: {
      '0': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 3,
        version: 0,
        conditions: {}
      },
      '1': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 5,
        version: 0,
        conditions: {}
      },
      '2': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 5,
        version: 0,
        conditions: {}
      },
      '3': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 5,
        version: 0,
        conditions: {}
      },
      '4': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 5,
        version: 0,
        conditions: {}
      },
      '5': {
        title: 'Monster',
        rarity: CARD_RARITY_LEGENDARY,
        cost: 1,
        range: 1,
        health: 5,
        attack: 5,
        version: 0,
        conditions: {}
      }
    }
  },
  pawn: {
    title: 'Pawn',
    rarity: CARD_RARITY_UNDEFINED,
    cost: 3,
    range: 1,
    health: 1,
    attack: 4,
    instances: {
      '0': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      },
      '1': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      },
      '2': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      },
      '3': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      },
      '4': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      },
      '5': {
        title: 'Pawn',
        rarity: CARD_RARITY_UNDEFINED,
        cost: 3,
        range: 1,
        health: 1,
        attack: 4,
        version: 0,
        conditions: {}
      }
    }
  }
}

cards[ENERGY_SHARD_CARD_ID] = {
  title: 'Energy Shard',
  type: CARD_TYPE_INSTANT,
  rarity: CARD_RARITY_STANDARD,
  cost: 0,
  abilities: [
    {
      id: ABILITY_ENERGIZE,
      amount: 1
    }
  ],
  instances: {}
}

cards[ENERGY_SHARD_CARD_ID].instances[ENERGY_SHARD_CARD_INSTANCE] = {
  ...cards[ENERGY_SHARD_CARD_ID],
  version: 0,
  conditions: {}
}

delete cards[ENERGY_SHARD_CARD_ID].instances[ENERGY_SHARD_CARD_INSTANCE].instances

export default cards