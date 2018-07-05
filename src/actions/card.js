export const SELECT_CARD = 'SELECT_CARD';

export const SelectCard = (cardId) => {
  return {
    type: SELECT_CARD,
    cardId
  }
};