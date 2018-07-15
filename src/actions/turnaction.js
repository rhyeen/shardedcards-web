export const RECORD_ATTACK_CARD = 'RECORD_ATTACK_CARD';
export const RECORD_PLACE_ON_PLAY_AREA = 'RECORD_PLACE_ON_PLAY_AREA';

export const RecordAttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => {
  return {
    type: RECORD_ATTACK_CARD,
    playerFieldCardIndex,
    opponentFieldCardIndex
  }
};

export const RecordPlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => {
  return {
    type: RECORD_PLACE_ON_PLAY_AREA,
    playerFieldCardIndex,
    handCardIndex
  }
};
