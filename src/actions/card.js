export const SELECT_CARD = 'SELECT_CARD';
export const CANCEL_SELECT_CARD = 'CANCEL_SELECT_CARD';
export const PLAY_SELECTED_CARD = 'PLAY_SELECTED_CARD';
export const CANCEL_PLAY_SELECTED_CARD = 'CANCEL_PLAY_SELECTED_CARD';
export const PLACE_ON_LEFT_PANE = 'PLACE_ON_LEFT_PANE';
export const PLACE_ON_MIDDLE_PANE = 'PLACE_ON_MIDDLE_PANE';
export const PLACE_ON_RIGHT_PANE = 'PLACE_ON_RIGHT_PANE';

export const SelectCard = (cardId) => {
  return {
    type: SELECT_CARD,
    cardId
  }
};

export const CancelSelectCard = () => {
  return {
    type: CANCEL_SELECT_CARD
  }
};

export const PlaySelectedCard = () => {
  return {
    type: PLAY_SELECTED_CARD
  }
};

export const CancelPlaySelectedCard = () => {
  return {
    type: CANCEL_PLAY_SELECTED_CARD
  }
};

export const PlaceOnLeftPane = () => {
  return {
    type: PLACE_ON_LEFT_PANE
  }
};

export const PlaceOnMiddlePane = () => {
  return {
    type: PLACE_ON_MIDDLE_PANE
  }
};

export const PlaceOnRightPane = () => {
  return {
    type: PLACE_ON_RIGHT_PANE
  }
};