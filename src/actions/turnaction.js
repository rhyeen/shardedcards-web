export const ATTACK_CARD = 'ATTACK_CARD';
export const PLACE_ON_PLAY_AREA = 'PLACE_ON_PLAY_AREA';

export const AttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => {
  return {
    type: ATTACK_CARD,
    playerFieldCardIndex,
    opponentFieldCardIndex
  }
};

export const PlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => {
  return {
    type: PLACE_ON_PLAY_AREA,
    playerFieldCardIndex,
    handCardIndex
  }
};
