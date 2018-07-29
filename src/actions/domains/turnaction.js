export const RECORD_ATTACK_CARD = 'RECORD_ATTACK_CARD';
export const RECORD_PLACE_ON_PLAY_AREA = 'RECORD_PLACE_ON_PLAY_AREA';
export const BEGIN_TURN = 'BEGIN_TURN';
export const END_TURN = 'END_TURN';
export const APPEND_PLAYER_HISTORY = 'APPEND_PLAYER_HISTORY';
export const APPEND_OPPONENT_HISTORY = 'APPEND_OPPONENT_HISTORY';
export const RESET_TURNS = 'RESET_TURNS';
export const RECORD_CAST_FROM_HAND = 'RECORD_CAST_FROM_HAND';
export const RECORD_CAST_FROM_PLAY_AREA = 'RECORD_CAST_FROM_PLAY_AREA';
export const RECORD_CAST_ABILITY_ENERGIZE = 'RECORD_CAST_ABILITY_ENERGIZE';

export const recordAttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => {
  return {
    type: RECORD_ATTACK_CARD,
    playerFieldCardIndex,
    opponentFieldCardIndex
  }
};

export const recordPlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => {
  return {
    type: RECORD_PLACE_ON_PLAY_AREA,
    playerFieldCardIndex,
    handCardIndex
  }
};

export const recordCastFromHand = (cardId, cardInstance, handCardIndex) => {
  return {
    type: RECORD_CAST_FROM_HAND,
    handCardIndex,
    cardId,
    cardInstance
  }
};

export const recordCastFromPlayArea = (cardId, cardInstance, playerFieldCardIndex) => {
  return {
    type: RECORD_CAST_FROM_PLAY_AREA,
    playerFieldCardIndex,
    cardId,
    cardInstance
  }
};

export const recordCastAbilityEnergize = (abilityId) => {
  return {
    type: RECORD_CAST_ABILITY_ENERGIZE,
    abilityId
  }
};

export const beginTurn = () => {
  return {
    type: BEGIN_TURN
  }
}

export const endTurn = () => {
  return {
    type: END_TURN
  }
}

export const appendPlayerHistory = (turn) => {
  return {
    type: APPEND_PLAYER_HISTORY,
    turn
  }
}

export const appendOpponentHistory = (turn) => {
  return {
    type: APPEND_OPPONENT_HISTORY,
    turn
  }
}

export const resetTurns = () => {
  return {
    type: RESET_TURNS
  }
}