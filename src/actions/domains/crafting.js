export const SELECT_CRAFTING_BASE_CARD = 'SELECT_CRAFTING_BASE_CARD';
export const CANCEL_SELECT_CRAFTING_BASE_CARD = 'CANCEL_SELECT_CRAFTING_BASE_CARD';
export const PLACE_BASE_CARD_ON_FORGE = 'PLACE_BASE_CARD_ON_FORGE';
export const SELECT_CRAFTING_PART = 'SELECT_CRAFTING_PART';
export const CANCEL_SELECT_CRAFTING_PART = 'CANCEL_SELECT_CRAFTING_PART';
export const PLACE_PART_ON_FORGE_CARD = 'PLACE_PART_ON_FORGE_CARD';
export const CONFIRM_PLACE_PART_ON_FORGE_CARD = 'CONFIRM_PLACE_PART_ON_FORGE_CARD';
export const CANCEL_PLACE_PART_ON_FORGE_CARD = 'CANCEL_PLACE_PART_ON_FORGE_CARD';

export const selectCraftingBaseCard = () => {
  return {
    type: SELECT_CRAFTING_BASE_CARD
  }
};

export const cancelSelectCraftingBaseCard = () => {
  return {
    type: CANCEL_SELECT_CRAFTING_BASE_CARD
  }
};

export const placeBaseCardOnForge = (forgeIndex) => {
  return {
    type: PLACE_BASE_CARD_ON_FORGE,
    forgeIndex
  }
}

export const selectCraftingPart = (partIndex) => {
  return {
    type: SELECT_CRAFTING_PART,
    partIndex
  }
}

export const cancelSelectCraftingPart = () => {
  return {
    type: CANCEL_SELECT_CRAFTING_PART
  }
}

export const placePartOnForgeCard = (forgeIndex) => {
  return {
    type: PLACE_PART_ON_FORGE_CARD,
    forgeIndex,
    partIndex
  }
}

export const confirmPlacePartOnForgeCard = () => {
  return {
    type: CONFIRM_PLACE_PART_ON_FORGE_CARD
  }
}

export const cancelPlacePartOnForgeCard = () => {
  return {
    type: CANCEL_PLACE_PART_ON_FORGE_CARD
  }
}