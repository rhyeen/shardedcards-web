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
export const ATTACK_PLAYER = 'ATTACK_PLAYER';
export const CLEAR_HAND = 'CLEAR_HAND';
export const SET_HAND = 'SET_HAND';
export const REFRESH_CARDS = 'REFRESH_CARDS';
export const SET_CARDS = 'SET_CARDS';
export const SET_OPPONENT_FIELD = 'SET_OPPONENT_FIELD';
export const SET_FIELD_FROM_OPPONENT_TURN = 'SET_FIELD_FROM_OPPONENT_TURN';
export const RESET_CARDS = 'RESET_CARDS';
export const CANCEL_CASTING_CARD = 'CANCEL_CASTING_CARD';
export const FINISH_CASTING_CARD = 'FINISH_CASTING_CARD';
export const CAST_CARD_FROM_HAND = 'CAST_CARD_FROM_HAND';
export const CAST_CARD_FROM_PLAY_AREA = 'CAST_CARD_FROM_PLAY_AREA';
export const USE_CARD_ABILITY = 'USE_CARD_ABILITY';
export const CAST_OPPONENT_TARGET_ABILITY = 'CAST_OPPONENT_TARGET_ABILITY';
export const CANCEL_CAST_OPPONENT_TARGET_ABILITY = 'CANCEL_CAST_OPPONENT_TARGET_ABILITY';
export const CAST_AGAINST_TARGET = 'CAST_AGAINST_TARGET';
export const APPLY_CAST_AGAINST_OPPONENT_TARGET = 'APPLY_CAST_AGAINST_OPPONENT_TARGET';

export const selectHandCard = (cardId, cardInstance, handIndex) => {
  return {
    type: SELECT_HAND_CARD,
    cardId,
    cardInstance,
    handIndex
  }
};

export const cancelSelectHandCard = () => {
  return {
    type: CANCEL_SELECT_HAND_CARD
  }
};

export const playSelectedHandCard = () => {
  return {
    type: PLAY_SELECTED_HAND_CARD
  }
};

export const cancelPlaySelectedHandCard = () => {
  return {
    type: CANCEL_PLAY_SELECTED_HAND_CARD
  }
};

export const placeOnPlayArea = (playAreaIndex) => {
  return {
    type: PLACE_ON_PLAY_AREA,
    playAreaIndex
  }
};

export const playFromPlayArea = (playAreaIndex) => {
  return {
    type: PLAY_FROM_PLAY_AREA,
    playAreaIndex
  }
};

export const cancelPlayFromPlayArea = () => {
  return {
    type: CANCEL_PLAY_FROM_PLAY_AREA
  }
};

export const selectOpponentFieldCard = (playAreaIndex) => {
  return {
    type: SELECT_OPPONENT_FIELD_CARD,
    playAreaIndex
  }
}

export const cancelSelectOpponentFieldCard = () => {
  return {
    type: CANCEL_SELECT_OPPONENT_FIELD_CARD
  }
}

export const selectPlayerFieldCard = (playAreaIndex) => {
  return {
    type: SELECT_PLAYER_FIELD_CARD,
    playAreaIndex
  }
}

export const cancelSelectPlayerFieldCard = () => {
  return {
    type: CANCEL_SELECT_PLAYER_FIELD_CARD
  }
}

export const attackCard = (playAreaIndex) => {
  return {
    type: ATTACK_CARD,
    playAreaIndex
  }
}

export const clearHand = () => {
  return {
    type: CLEAR_HAND
  }
}

export const setHand = ({hand, deckSize, discardPileSize, lostCardsSize}) => {
  return {
    type: SET_HAND,
    hand,
    deckSize,
    discardPileSize,
    lostCardsSize
  }
}

export const refreshCards = () => {
  return {
    type: REFRESH_CARDS
  }
}

export const setCards = (cards) => {
  return {
    type: SET_CARDS,
    cards
  }
}

export const setOpponentField = ({opponentField, opponentFieldBacklog, opponentFieldCards}) => {
  return {
    type: SET_OPPONENT_FIELD,
    opponentField,
    opponentFieldBacklog,
    opponentFieldCards
  }
}

export const setFieldFromOpponentTurn = (opponentTurn) => {
  return {
    type: SET_FIELD_FROM_OPPONENT_TURN,
    opponentTurn
  }
}

export const resetCards = () => {
  return {
    type: RESET_CARDS
  }
}

export const cancelCastingCard = () => {
  return {
    type: CANCEL_CASTING_CARD
  }
}

export const finishCastingCard = () => {
  return {
    type: FINISH_CASTING_CARD
  }
}

export const useCardAbility = (cardId, cardInstance, abilityId) => {
  return {
    type: USE_CARD_ABILITY,
    cardId,
    cardInstance,
    abilityId
  }
}

export const castOpponentTargetAbility = (abilityId) => {
  return {
    type: CAST_OPPONENT_TARGET_ABILITY,
    abilityId
  }
}

export const cancelCastOpponentTargetAbility = (abilityId) => {
  return {
    type: CANCEL_CAST_OPPONENT_TARGET_ABILITY,
    abilityId
  }
}

export const castAgainstTarget = (playAreaIndex) => {
  return {
    type: CAST_AGAINST_TARGET,
    playAreaIndex
  }
}

export const applyCastAgainstOpponentTarget = (cardId, cardInstance, abilityId, playAreaIndex) => {
  return {
    type: APPLY_CAST_AGAINST_OPPONENT_TARGET,
    cardId,
    cardInstance,
    abilityId,
    playAreaIndex
  }
}