import {
  navigate,
  showSnackbar,
  updateOffline } from './domains/page.js';

import {
  showInGameMenu,
  hideInGameMenu,
  resetGame } from './domains/game.js';

import {
  spendAllocatedEnergy,
  allocateEnergy,
  cancelAllocateEnergy } from './domains/status.js';

import {
  recordAttackCard,
  recordPlaceOnPlayArea,
  recordCastFromHand,
  recordCastFromPlayArea,
  recordCastAbilityEnergize,
  endTurn } from './domains/turnaction.js';

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
  finishCastingCard } from './domains/card.js';


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
  dispatch(endTurn(turn))
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