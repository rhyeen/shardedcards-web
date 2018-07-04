export const UPDATE_CARD_TITLE = 'UPDATE_CARD_TITLE';

export const actionUpdateCardTitle = (cardId, cardTitle) => {
  return {
    type: UPDATE_CARD_TITLE,
    cardId,
    cardTitle
  }
};
