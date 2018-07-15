export const SELECT_HAND_CARD = 'SELECT_HAND_CARD';
export const CANCEL_SELECT_HAND_CARD = 'CANCEL_SELECT_HAND_CARD';
export const PLAY_SELECTED_HAND_CARD = 'PLAY_SELECTED_HAND_CARD';
export const CANCEL_PLAY_SELECTED_HAND_CARD = 'CANCEL_PLAY_SELECTED_HAND_CARD';
export const PLACE_ON_PLAY_AREA = 'PLACE_ON_PLAY_AREA';
export const PLAY_FROM_PLAY_AREA = 'PLAY_FROM_PLAY_AREA';
export const CANCEL_PLAY_FROM_PLAY_AREA = 'CANCEL_PLAY_FROM_PLAY_AREA';
export const SELECT_OPPONENT_FIELD_CARD = 'SELECT_OPPONENT_FIELD_CARD';
export const CANCEL_SELECT_OPPONENT_FIELD_CARD = 'CANCEL_SELECT_OPPONENT_FIELD_CARD';
export const SELECT_PLAYER_FIELD_CARD = 'SELECT_PLAYER_FIELD_CARD';
export const CANCEL_SELECT_PLAYER_FIELD_CARD = 'CANCEL_SELECT_PLAYER_FIELD_CARD';
export const ATTACK_CARD = 'ATTACK_CARD';
export const CLEAR_HAND = 'CLEAR_HAND';
export const SET_HAND = 'SET_HAND';

export const SelectHandCard = (cardId, cardInstance, handIndex) => {
  return {
    type: SELECT_HAND_CARD,
    cardId,
    cardInstance,
    handIndex
  }
};

export const CancelSelectHandCard = () => {
  return {
    type: CANCEL_SELECT_HAND_CARD
  }
};

export const PlaySelectedHandCard = () => {
  return {
    type: PLAY_SELECTED_HAND_CARD
  }
};

export const CancelPlaySelectedHandCard = () => {
  return {
    type: CANCEL_PLAY_SELECTED_HAND_CARD
  }
};

export const PlaceOnPlayArea = (playAreaIndex) => {
  return {
    type: PLACE_ON_PLAY_AREA,
    playAreaIndex
  }
};

export const PlayFromPlayArea = (playAreaIndex) => {
  return {
    type: PLAY_FROM_PLAY_AREA,
    playAreaIndex
  }
};

export const CancelPlayFromPlayArea = () => {
  return {
    type: CANCEL_PLAY_FROM_PLAY_AREA
  }
};

export const SelectOpponentFieldCard = (playAreaIndex) => {
  return {
    type: SELECT_OPPONENT_FIELD_CARD,
    playAreaIndex
  }
}

export const CancelSelectOpponentFieldCard = () => {
  return {
    type: CANCEL_SELECT_OPPONENT_FIELD_CARD
  }
}

export const SelectPlayerFieldCard = (playAreaIndex) => {
  return {
    type: SELECT_PLAYER_FIELD_CARD,
    playAreaIndex
  }
}

export const CancelSelectPlayerFieldCard = () => {
  return {
    type: CANCEL_SELECT_PLAYER_FIELD_CARD
  }
}

export const AttackCard = (playAreaIndex) => {
  return {
    type: ATTACK_CARD,
    playAreaIndex
  }
}

export const ClearHand = () => {
  return {
    type: CLEAR_HAND
  }
}

export const SetHand = (hand) => {
  return {
    type: SET_HAND,
    hand
  }
}