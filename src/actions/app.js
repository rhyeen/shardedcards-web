import {
  navigate,
  showSnackbar,
  updateOffline } from './domains/page.js';

import {
  showInGameMenu,
  hideInGameMenu,
  resetGame,
  loseGame,
  winGame } from './domains/game.js';

import {
  spendAllocatedEnergy,
  allocateEnergy,
  cancelAllocateEnergy,
  setStatus,
  resetEnergy,
  setPlayerHealth } from './domains/status.js';

import {
  recordAttackCard,
  recordPlaceOnPlayArea,
  recordCastFromHand,
  recordCastFromPlayArea,
  recordCastAbilityEnergize,
  endTurn,
  resetTurns,
  appendOpponentHistory,
  appendPlayerHistory,
  beginTurn } from './domains/turnaction.js';

import {
  selectHandCard,
  cancelSelectHandCard,
  playSelectedHandCard,
  cancelPlaySelectedHandCard,
  placeOnPlayArea,
  playFromPlayArea,
  cancelPlayFromPlayArea,
  selectOpponentFieldCard,
  cancelSelectOpponentFieldCard,
  selectPlayerFieldCard,
  cancelSelectPlayerFieldCard,
  attackCard,
  clearHand,
  cancelCastingCard,
  finishCastingCard,
  resetCards,
  setCards,
  setHand,
  setOpponentField,
  refreshCards,
  setFieldFromOpponentTurn } from './domains/card.js';

import {
  CallStartGame,
  CallEndTurn } from '../services/turnaction.js';

import { 
  CallGetCards,
  CallGetHand,
  CallGetOpponentField } from '../services/card.js';

export const Navigate = (path) => (dispatch) => {
  dispatch(navigate(path))
}

export const ShowSnackbar = () => (dispatch) => {
  dispatch(showSnackbar())
}

export const UpdateOffline = (offline) => (dispatch) => {
  dispatch(updateOffline(offline))
}

export const ShowInGameMenu = () => (dispatch) => {
  dispatch(showInGameMenu())
}

export const HideInGameMenu = () => (dispatch) => {
  dispatch(hideInGameMenu())
}

export const ResetGame = () => (dispatch) => {
  dispatch(resetGame())
  CallStartGame()
  .then((initialGame) => {
    dispatch(setStatus(initialGame.status))
    dispatch(resetCards())
    dispatch(resetTurns())
    Promise.all([CallGetCards(), CallGetHand(), CallGetOpponentField()])
    .then(results => {
      dispatch(setCards(results[0]))
      dispatch(setHand(results[1]))
      dispatch(setOpponentField(results[2]))
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => console.error(err))

}

export const SpendAllocatedEnergy = () => (dispatch) => {
  dispatch(spendAllocatedEnergy())
}

export const AllocateEnergy = (energyCost) => (dispatch) => {
  dispatch(allocateEnergy(energyCost))
}

export const CancelAllocateEnergy = () => (dispatch) => {
  dispatch(cancelAllocateEnergy())
}

export const RecordAttackCard = (playerFieldCardIndex, opponentFieldCardIndex) => (dispatch) => {
  dispatch(recordAttackCard(playerFieldCardIndex, opponentFieldCardIndex))
}

export const RecordPlaceOnPlayArea = (playerFieldCardIndex, handCardIndex) => (dispatch) => {
  dispatch(recordPlaceOnPlayArea(playerFieldCardIndex, handCardIndex))
}

export const RecordCastFromHand = (cardId, cardInstance, handCardIndex) => (dispatch) => {
  dispatch(recordCastFromHand(cardId, cardInstance, handCardIndex))
}

export const RecordCastFromPlayArea = (cardId, cardInstance, playerFieldCardIndex) => (dispatch) => {
  dispatch(recordCastFromPlayArea(cardId, cardInstance, playerFieldCardIndex))
}

export const RecordCastAbilityEnergize = (cardId, cardInstance, playerFieldCardIndex) => (dispatch) => {
  dispatch(recordCastAbilityEnergize(cardId, cardInstance, playerFieldCardIndex))
}

export const EndTurn = (turn) => (dispatch) => {
  dispatch(endTurn())
  CallEndTurn(turn)
  .then(results => {
    dispatch(setPlayerHealth(results.remainingPlayerHealth))
    if (results.remainingPlayerHealth <= 0) {
      dispatch(loseGame())
    }
    dispatch(setFieldFromOpponentTurn(results.opponentTurn))
    dispatch(appendOpponentHistory(results.opponentTurn))
    dispatch(appendPlayerHistory(turn))
    dispatch(beginTurn())
    dispatch(resetEnergy())
    dispatch(refreshCards())
    CallGetHand()
    .then(hand => dispatch(setHand(hand)))
    .catch(err => console.error(err))
    CallGetOpponentField()
    .then(result => {
      dispatch(setOpponentField(result))
      if (!result.opponentField[0].id && !result.opponentField[1].id && !result.opponentField[2].id) {
        dispatch(winGame())
      }
    })
    .catch(err => console.error(err))
  })
  .catch(err => {
    console.error(err)
    dispatch(appendPlayerHistory(turn))
    dispatch(beginTurn())
    dispatch(resetEnergy())
    dispatch(refreshCards())
  })
}

export const SelectHandCard = (cardId, cardInstance, handIndex) => (dispatch) => {
  dispatch(selectHandCard(cardId, cardInstance, handIndex))
}

export const CancelSelectHandCard = () => (dispatch) => {
  dispatch(cancelSelectHandCard())
}

export const PlaySelectedHandCard = () => (dispatch) => {
  dispatch(playSelectedHandCard())
}

export const CancelPlaySelectedHandCard = () => (dispatch) => {
  dispatch(cancelPlaySelectedHandCard())
}

export const PlaceOnPlayArea = (playAreaIndex) => (dispatch) => {
  dispatch(placeOnPlayArea(playAreaIndex))
}

export const PlayFromPlayArea = (playAreaIndex) => (dispatch) => {
  dispatch(playFromPlayArea(playAreaIndex))
}

export const CancelPlayFromPlayArea = () => (dispatch) => {
  dispatch(cancelPlayFromPlayArea())
}

export const SelectOpponentFieldCard = (playAreaIndex) => (dispatch) => {
  dispatch(selectOpponentFieldCard(playAreaIndex))
}

export const CancelSelectOpponentFieldCard = () => (dispatch) => {
  dispatch(cancelSelectOpponentFieldCard())
}

export const SelectPlayerFieldCard = (playAreaIndex) => (dispatch) => {
  dispatch(selectPlayerFieldCard(playAreaIndex))
}

export const CancelSelectPlayerFieldCard = () => (dispatch) => {
  dispatch(cancelSelectPlayerFieldCard())
}

export const AttackCard = (playAreaIndex) => (dispatch) => {
  dispatch(attackCard(playAreaIndex))
}

export const ClearHand = () => (dispatch) => {
  dispatch(clearHand())
}

export const CancelCastingCard = () => (dispatch) => {
  dispatch(cancelCastingCard())
}

export const FinishCastingCard = () => (dispatch) => {
  dispatch(finishCastingCard())
}