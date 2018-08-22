import { 
  SELECT_CRAFTING_BASE_CARD,
  CANCEL_SELECT_CRAFTING_BASE_CARD,
  PLACE_BASE_CARD_ON_FORGE,
  SELECT_CRAFTING_PART,
  CANCEL_SELECT_CRAFTING_PART,
  PLACE_PART_ON_FORGE_CARD,
  CONFIRM_PLACE_PART_ON_FORGE_CARD,
  CANCEL_PLACE_PART_ON_FORGE_CARD } from '../actions/domains/crafting.js';

import {
  CARD_TYPE_UNIT,
  CARD_RARITY_COMMON } from '../util/card-constants.js';



const defaultState = {
  craftingBaseCard: {
    type: CARD_TYPE_UNIT,
    rarity: CARD_RARITY_COMMON,
    cost: 1,
    range: 1,
    health: 5,
    attack: 1,
    abilities: []
  },
  forge: [
    {
      card: {}
    },
    {
      card: {}
    }
  ],
  craftingBaseCardSelected: false,
  selectedCraftingPart: {
    partIndex: null,
    forgeIndex: null
  }
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_CRAFTING_BASE_CARD:
      return {
        ...state,
        craftingBaseCardSelected: true
      }
    case CANCEL_SELECT_CRAFTING_BASE_CARD:
      return {
        ...state,
        craftingBaseCardSelected: false
      }
    case PLACE_BASE_CARD_ON_FORGE:
      state.forge[action.forgeIndex].card = {
        ...state.craftingBaseCard
      }
      return {
        ...state,
        craftingBaseCardSelected: false,
        craftingBaseCard: null
      }
    case SELECT_CRAFTING_PART:
      return {
        ...state,
        selectedCraftingPart: {
          partIndex: action.partIndex,
          forgeIndex: null
        }
      }
    case CANCEL_SELECT_CRAFTING_PART:
      return {
        ...state,
        selectedCraftingPart: {
          partIndex: null,
          forgeIndex: null
        }
      }
    case PLACE_PART_ON_FORGE_CARD:
      return {
        ...state,
        selectedCraftingPart: {
          ...state.selectCraftingPart,
          forgeIndex: action.forgeIndex
        }
      }
    case CONFIRM_PLACE_PART_ON_FORGE_CARD:
      console.log('@TODO: Update forge card with part...')
      return {
        ...state,
        selectedCraftingPart: {
          partIndex: null,
          forgeIndex: null
        }
      }
    case CANCEL_PLACE_PART_ON_FORGE_CARD:
      return {
        ...state,
        selectedCraftingPart: {
          partIndex: null,
          forgeIndex: null
        }
      }
    default:
      return state;
  }
}

export default app;
