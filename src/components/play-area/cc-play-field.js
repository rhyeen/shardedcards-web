import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import '../cards/card-types/cc-pawn-card.js';
import '../cards/card-types/cc-replace-card.js';
import '../cards/card-types/cc-attack-card.js';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../util/owner.js';

import { 
  PlaceOnPlayArea,
  PlayFromPlayArea,
  SelectOpponentFieldCard,
  SelectPlayerFieldCard,
  AttackCard,
  SpendAllocatedEnergy,
  RecordAttackCard,
  RecordPlaceOnPlayArea } from '../../actions/app.js';

export class CcPlayField extends connect(store)(LitElement) {
  _render({_leftCard, _middleCard, _rightCard, overlay, _totalCardVersion}) {
    let leftCardHtml = this._getCardHtml(_leftCard, 0)
    let middleCardHtml = this._getCardHtml(_middleCard, 1)
    let rightCardHtml = this._getCardHtml(_rightCard, 2)
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
        }
      </style>
      <div class="field-pane left">
        ${leftCardHtml}
      </div>
      <div class="field-pane-separator" overlay?="${overlay}"></div>
      <div class="field-pane middle">
        ${middleCardHtml}
      </div>
      <div class="field-pane-separator" overlay?="${overlay}"></div>
      <div class="field-pane right">
        ${rightCardHtml}
      </div>
    `
  }

  static get properties() { return {
    owner: String,
    overlay: Boolean,
    _leftCard: Object,
    _rightCard: Object,
    _middleCard: Object,
    _attackingCard: Object,
    _replacingCard: Object,
    _handCardIndex: Number,
    _playingFromPlayAreaIndex: Number,
    _totalCardVersion: Number // meant soley to force an update, if need be
  }};

  _stateChanged(state) {
    if (state.card.playFromPlayArea.id) {
      this._playingFromPlayAreaIndex = state.card.playFromPlayArea.playAreaIndex
      this._attackingCard = state.card.cards[state.card.playFromPlayArea.id].instances[state.card.playFromPlayArea.instance]
    } else {
      this._playingFromPlayAreaIndex = -1
      this._attackingCard = null
    }
    if (state.card.playFromHand.id) {
      this._replacingCard = state.card.cards[state.card.playFromHand.id].instances[state.card.playFromHand.instance]
      this._handCardIndex = state.card.playFromHand.handIndex
    } else {
      this._replacingCard = null      
    }
    switch(this.owner) {
      case PLAYER_OWNER:
        this._leftCard = this._getCard(state, state.card.playerField[0].id, state.card.playerField[0].instance)
        this._middleCard = this._getCard(state, state.card.playerField[1].id, state.card.playerField[1].instance)
        this._rightCard = this._getCard(state, state.card.playerField[2].id, state.card.playerField[2].instance)
        break;
      case OPPONENT_OWNER:
        this._leftCard = this._getOpponentCard(state, state.card.opponentField[0].id, state.card.opponentField[0].instance)
        this._middleCard = this._getOpponentCard(state, state.card.opponentField[1].id, state.card.opponentField[1].instance)
        this._rightCard = this._getOpponentCard(state, state.card.opponentField[2].id, state.card.opponentField[2].instance)
        break;
      default:
        console.error(`Invalid owner: ${this.owner}`)
        this._leftCard = null
        this._rightCard = null
        this._middleCard = null
        break;
    }
    this._setTotalCardVersion()
  }

  _setTotalCardVersion() {
    this._totalCardVersion = 0
    this._totalCardVersion += this._getCardVersion(this._leftCard)
    this._totalCardVersion += this._getCardVersion(this._middleCard)
    this._totalCardVersion += this._getCardVersion(this._rightCard)
  }

  _getCardVersion(card) {
    if (!card) {
      return 0
    }
    return card.version
  }

  _getCard(state, cardId, cardInstance) {
    if (!cardId) {
      return null
    }
    return state.card.cards[cardId].instances[cardInstance]
  }

  _getOpponentCard(state, cardId, cardInstance) {
    if (!cardId) {
      return null
    }
    return state.card.opponentCards[cardId].instances[cardInstance]
  }

  _getCardHtml(card, playAreaIndex) {
    if (this._showAttackCard(card, playAreaIndex)) {
      return this._attackCard(card, playAreaIndex)
    }
    if (this._showReplaceCard(card, playAreaIndex)) {
      return this._replaceCard(card, playAreaIndex)
    }
    if (this._showPlayerPawnCard(card)) {
      return this._playerPawnCard(card, playAreaIndex)
    }
    if (this._showSelectedPawnCard(card, playAreaIndex)) {
      return this._selectedPawnCard(card, playAreaIndex)
    }
    if (this._showOpponentPawnCard(card)) {
      return this._opponentPawnCard(card, playAreaIndex)
    }
    return html``
  }

  _showAttackCard(card, playAreaIndex) {
    return (
      this._isOverlay() &&
      this._isOpponent() &&
      this._playingFromPlayArea() &&
      this._isWithinRange(card, playAreaIndex) &&
      !this._isExhausted())
  }

  _showReplaceCard() {
    return (
      this._isOverlay() && 
      this._isPlayer() && 
      !this._playingFromPlayArea() && 
      this._replacingCard)
  }

  _showPlayerPawnCard(card) {
    return this._hasCardToShow(card) && !this._isOverlay() && this._isPlayer()
  }

  _showSelectedPawnCard(card, playAreaIndex) {
    return (
      this._hasCardToShow(card) && 
      this._isOverlay() && 
      this._isPlayer() && 
      this._isCardBeingPlayed(playAreaIndex))
  }

  _showOpponentPawnCard(card) {
    return this._hasCardToShow(card) && !this._isOverlay() && this._isOpponent()
  }

  _playingFromPlayArea() {
    return this._playingFromPlayAreaIndex !== -1
  }

  _isWithinRange(opposingCard, playAreaIndex) {
    if (!this._attackingCard || !opposingCard) {
      return false;
    }
    return this._attackingCard.range >= Math.abs(playAreaIndex - this._playingFromPlayAreaIndex) + 1
  }

  _isExhausted() {
    return this._attackingCard.conditions.exhausted
  }

  _isCardBeingPlayed(playAreaIndex) {
    return this._playingFromPlayAreaIndex === playAreaIndex
  }

  _isOpponent() {
    return this.owner === OPPONENT_OWNER
  }

  _isPlayer() {
    return this.owner === PLAYER_OWNER
  }

  _isOverlay() {
    return !!this.overlay
  }

  _hasCardToShow(card) {
    return !!card
  }

  _attackCard(card, playAreaIndex) {
    const hardCodedPlayerPlayAreaIndex = this._playingFromPlayAreaIndex
    return html`
      <cc-attack-card
          attacked="${card}"
          attacking="${this._attackingCard}"
          on-click="${() => {
            store.dispatch(AttackCard(playAreaIndex))
            store.dispatch(RecordAttackCard(hardCodedPlayerPlayAreaIndex, playAreaIndex))
          }}"></cc-attack-card>`
  }

  _replaceCard(card, playAreaIndex, handCardIndex) {
    return html`
      <cc-replace-card
          replaced="${card}"
          replacing="${this._replacingCard}"
          on-click="${() => {
            store.dispatch(SpendAllocatedEnergy())
            store.dispatch(PlaceOnPlayArea(playAreaIndex))
            store.dispatch(RecordPlaceOnPlayArea(playAreaIndex, this._handCardIndex))
          }}"></cc-replace-card>`
  }

  _playerPawnCard(card, playAreaIndex) {
    return html`
      <cc-pawn-card
          card="${card}"
          cardversion$="${card.version}"
          on-click="${() => store.dispatch(PlayFromPlayArea(playAreaIndex))}"></cc-pawn-card>`
  }

  _selectedPawnCard(card, playAreaIndex) {
    return html`
      <cc-pawn-card
          card="${card}"
          cardversion$="${card.version}"
          on-click="${() => store.dispatch(SelectPlayerFieldCard(playAreaIndex))}"></cc-pawn-card>`
  }

  _opponentPawnCard(card, playAreaIndex) {
    return html`
      <cc-pawn-card
          card="${card}"
          cardversion$="${card.version}"
          on-click="${() => store.dispatch(SelectOpponentFieldCard(playAreaIndex))}"></cc-pawn-card>`
  }
}

window.customElements.define('cc-play-field', CcPlayField);
