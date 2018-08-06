import { store } from '../store.js';

import { 
  GetCard,
  GetCardAbility } from '../util/card.js';

import {
  navigate,
  showSnackbar,
  updateOffline } from './domains/page.js';

import {
  showInGameMenu,
  hideInGameMenu,
  resetGame,
  loseGame,
  winGame,
  startCrafting,
  finishCrafting } from './domains/game.js';

import {
  spendAllocatedEnergy,
  allocateEnergy,
  cancelAllocateEnergy,
  setStatus,
  resetEnergy,
  setPlayerHealth,
  modifyEnergy } from './domains/status.js';

import {
  recordAttackCard,
  recordPlaceOnPlayArea,
  recordCastFromHand,
  recordCastFromPlayArea,
  recordCastNoTargetAbility,
  endTurn,
  resetTurns,
  appendOpponentHistory,
  appendPlayerHistory,
  beginTurn,
  beginOpponentTurn,
  recordCastOpponentTargetAbility,
  recordCastUnitTargetAbility } from './domains/turnaction.js';

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
  setFieldFromOpponentTurn,
  useCardAbility,
  castOpponentTargetAbility,
  cancelCastOpponentTargetAbility,
  castAgainstTarget,
  applyCastAgainstOpponentTarget,
  castUnitTargetAbility,
  cancelCastUnitTargetAbility,
  applyCastAgainstUnitTarget } from './domains/card.js';

import {
  CallStartGame,
  CallEndTurn,
  CallBeginTurn } from '../services/turnaction.js';

import { 
  CallGetCards,
  CallGetHand,
  CallGetOpponentField } from '../services/card.js';
import { ABILITY_ENERGIZE } from '../util/card-constants.js';

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
  dispatch(HideInGameMenu())
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

function _getDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export const EndTurn = () => (dispatch) => {
  dispatch(clearHand())
  const turn = _getDeepCopy(store.getState().turnaction.pendingTurn)
  dispatch(endTurn())
  dispatch(startCrafting())
  CallEndTurn(turn)
  .then(() => {
    dispatch(appendPlayerHistory(turn))
  })
  .catch(err => {
    console.error(err)
    dispatch(appendPlayerHistory(turn))
  })
}

export const SelectHandCard = (cardId, cardInstance, handIndex) => (dispatch) => {
  dispatch(selectHandCard(cardId, cardInstance, handIndex))
}

export const CancelSelectHandCard = () => (dispatch) => {
  dispatch(cancelSelectHandCard())
}

export const PlaySelectedHandCard = () => (dispatch) => {
  const selectedCard = store.getState().card.selectedHandCard
  const card = GetCard(store.getState().card.cards, selectedCard.id, selectedCard.instance)
  dispatch(allocateEnergy(card.cost))
  dispatch(playSelectedHandCard())
}

export const CancelPlaySelectedHandCard = () => (dispatch) => {
  dispatch(cancelAllocateEnergy())
  dispatch(cancelPlaySelectedHandCard())
}

export const PlaceOnPlayArea = (playAreaIndex) => (dispatch) => {
  dispatch(spendAllocatedEnergy())
  dispatch(recordPlaceOnPlayArea(playAreaIndex, store.getState().card.playFromHand.handIndex))
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
  dispatch(recordAttackCard(store.getState().card.playFromPlayArea.playAreaIndex, playAreaIndex))
  dispatch(attackCard(playAreaIndex))
}

export const FinishCrafting = () => (dispatch) => {
  dispatch(finishCrafting())
  dispatch(beginOpponentTurn())
  CallBeginTurn()
  .then(results => {
    dispatch(setPlayerHealth(results.remainingPlayerHealth))
    if (results.remainingPlayerHealth <= 0) {
      dispatch(loseGame())
    }
    dispatch(setFieldFromOpponentTurn(results.opponentTurn))
    dispatch(appendOpponentHistory(results.opponentTurn))
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
    dispatch(beginTurn())
    dispatch(resetEnergy())
    dispatch(refreshCards())
  })
}

export const CastAbilityEnergize = (abilityId) => (dispatch) => {
  dispatch(_castNoTargetAbility(abilityId))
}

export const _castNoTargetAbility = (abilityId) => (dispatch) => {
  _recordCastFromPosition(dispatch, store.getState().card.selectedCastingCard)
  dispatch(recordCastNoTargetAbility(abilityId))
  switch (abilityId) {
    case ABILITY_ENERGIZE:
      return _applyAbilityEnergize(dispatch, abilityId)
    default:
      console.error(`Unexpected no target ability: ${abilityId}`)
      return
  }
}

function _applyAbilityEnergize(dispatch, abilityId) {
  const ability = _getCastingAbility(abilityId)
  dispatch(modifyEnergy(ability.amount, ability.amount))
  _useSelectedCastingCardAbility(dispatch, abilityId)
}

export const CastAbilitySpellshot = (abilityId) => (dispatch) => {
  dispatch(castOpponentTargetAbility(abilityId))
}

export const CastAbilityReach = (abilityId) => (dispatch) => {
  dispatch(castUnitTargetAbility(abilityId))
}

function _recordCastFromPosition(dispatch, positionSelectedState) {
  const cardId = positionSelectedState.id
  const cardInstance = positionSelectedState.instance
  const handIndex = positionSelectedState.handIndex
  const playAreaIndex = positionSelectedState.playAreaIndex
  if (handIndex === 0 || handIndex) {
    dispatch(recordCastFromHand(cardId, cardInstance, handIndex))
  } else if (playAreaIndex === 0 || playAreaIndex) {
    dispatch(recordCastFromPlayArea(cardId, cardInstance, playAreaIndex))
  } else {
    console.error('Unexpected casting origin: not from hand nor play area.')
    return
  }
}

function _getCastingAbility(abilityId) {
  const selectedCastingCard = store.getState().card.selectedCastingCard
  const cardId = selectedCastingCard.id
  const cardInstance = selectedCastingCard.instance
  return GetCardAbility(store.getState().card.cards, cardId, cardInstance, abilityId)
}

function _useSelectedCastingCardAbility(dispatch, abilityId) {
  const selectedCastingCard = store.getState().card.selectedCastingCard
  const cardId = selectedCastingCard.id
  const cardInstance = selectedCastingCard.instance
  dispatch(useCardAbility(cardId, cardInstance, abilityId))
}

export const CancelCastingCard = () => (dispatch) => {
  dispatch(cancelAllocateEnergy())
  dispatch(cancelCastingCard())
}

export const FinishCastingCard = () => (dispatch) => {
  dispatch(spendAllocatedEnergy())
  dispatch(finishCastingCard())
}

export const CancelCastTargetAbility = () => (dispatch) => {
  const cardState =  store.getState().card
  if (cardState.selectedTargetOpponentAbility.id) {
    dispatch(cancelCastOpponentTargetAbility())
  } else if (cardState.selectedTargetUnitAbility.id) {
    dispatch(cancelCastUnitTargetAbility())
  } else {
    console.error('Unexpected cancel target ability state')
  }
}

export const CastAgainstTarget = (playAreaIndex) => (dispatch) => {
  const cardState = store.getState().card
  if (cardState.selectedTargetOpponentAbility.id) {
    _recordCastFromPosition(dispatch, cardState.selectedTargetOpponentAbility)
    dispatch(recordCastOpponentTargetAbility(cardState.selectedTargetOpponentAbility.abilityId, playAreaIndex))
    _applyCastAgainstOpponentTarget(dispatch, playAreaIndex)  
    _useSelectedTargetOpponentAbility(dispatch)
    dispatch(castAgainstTarget(playAreaIndex))
  } else if (cardState.selectedTargetUnitAbility.id) {
    _recordCastFromPosition(dispatch, cardState.selectedTargetUnitAbility)
    dispatch(recordCastUnitTargetAbility(cardState.selectedTargetUnitAbility.abilityId, playAreaIndex))
    _applyCastAgainstUnitTarget(dispatch, playAreaIndex)  
    _useSelectedTargetUnitAbility(dispatch)
    dispatch(castAgainstTarget(playAreaIndex))
  } else {
    console.error('Unexpected cast against target state')
  }
}

function _applyCastAgainstOpponentTarget(dispatch, playAreaIndex) {
  const selectedTargetOpponentAbility = store.getState().card.selectedTargetOpponentAbility
  const cardId = selectedTargetOpponentAbility.id
  const cardInstance = selectedTargetOpponentAbility.instance
  const abilityId = selectedTargetOpponentAbility.abilityId
  dispatch(applyCastAgainstOpponentTarget(cardId, cardInstance, abilityId, playAreaIndex))
}

function _useSelectedTargetOpponentAbility(dispatch) {
  const selectedTargetOpponentAbility = store.getState().card.selectedTargetOpponentAbility
  const cardId = selectedTargetOpponentAbility.id
  const cardInstance = selectedTargetOpponentAbility.instance
  const abilityId = selectedTargetOpponentAbility.abilityId
  dispatch(useCardAbility(cardId, cardInstance, abilityId))
}

function _applyCastAgainstUnitTarget(dispatch, playAreaIndex) {
  const selectedTargetUnitAbility = store.getState().card.selectedTargetUnitAbility
  const cardId = selectedTargetUnitAbility.id
  const cardInstance = selectedTargetUnitAbility.instance
  const abilityId = selectedTargetUnitAbility.abilityId
  dispatch(applyCastAgainstUnitTarget(cardId, cardInstance, abilityId, playAreaIndex))
}

function _useSelectedTargetUnitAbility(dispatch) {
  const selectedTargetUnitAbility = store.getState().card.selectedTargetUnitAbility
  const cardId = selectedTargetUnitAbility.id
  const cardInstance = selectedTargetUnitAbility.instance
  const abilityId = selectedTargetUnitAbility.abilityId
  dispatch(useCardAbility(cardId, cardInstance, abilityId))
}