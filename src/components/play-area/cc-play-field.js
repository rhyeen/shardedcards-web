import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import '../cards/card-types/cc-pawn-card.js';
import '../cards/card-types/cc-replace-card.js';
import '../cards/card-types/cc-attack-card.js';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../data/owner.js';

import { 
  PlaceOnPlayArea,
  PlayFromPlayArea,
  SelectOpponentFieldCard,
  SelectPlayerFieldCard,
  AttackCard } from '../../actions/card.js';

import {
  SpendAllocatedEnergy } from '../../actions/status.js';

export class CcPlayField extends connect(store)(LitElement) {
  _render({_leftCard, _middleCard, _rightCard, overlay, _playingFromPlayAreaIndex, owner, _attackingCard}) {
    let leftCardHtml = this._getCardHtml(_leftCard, owner, overlay, _playingFromPlayAreaIndex, 0, _attackingCard)
    let middleCardHtml = this._getCardHtml(_middleCard, owner, overlay, _playingFromPlayAreaIndex, 1, _attackingCard)
    let rightCardHtml = this._getCardHtml(_rightCard, owner, overlay, _playingFromPlayAreaIndex, 2, _attackingCard)
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
    _playingFromPlayAreaIndex: Number
  }};

  _stateChanged(state) {
    if (state.card.playFromPlayArea.id) {
      this._playingFromPlayAreaIndex = state.card.playFromPlayArea.playAreaIndex
      this._attackingCard = state.card.cards[state.card.playFromPlayArea.id].instances[state.card.playFromPlayArea.instance]
    } else {
      this._playingFromPlayAreaIndex = -1
      this._attackingCard = null
    }
    switch(this.owner) {
      case PLAYER_OWNER:
        this._leftCard = this._getCard(state, state.card.playerField[0].id, state.card.playerField[0].instance)
        this._middleCard = this._getCard(state, state.card.playerField[1].id, state.card.playerField[1].instance)
        this._rightCard = this._getCard(state, state.card.playerField[2].id, state.card.playerField[2].instance)
        break;
      case OPPONENT_OWNER:
        this._leftCard = this._getCard(state, state.card.opponentField[0].id, state.card.opponentField[0].instance)
        this._middleCard = this._getCard(state, state.card.opponentField[1].id, state.card.opponentField[1].instance)
        this._rightCard = this._getCard(state, state.card.opponentField[2].id, state.card.opponentField[2].instance)
        break;
      default:
        console.error(`Invalid owner: ${this.owner}`)
        this._leftCard = null
        this._rightCard = null
        this._middleCard = null
        break;
    }
  }

  _getCard(state, cardId, cardInstance) {
    if (!cardId) {
      return null
    }
    return state.card.cards[cardId].instances[cardInstance]
  }

  _isWithinRange(attackingCard, opposingCard, playAreaIndex, playingFromPlayAreaIndex) {
    if (!attackingCard || !opposingCard) {
      return false;
    }
    return attackingCard.range >= Math.abs(playAreaIndex - playingFromPlayAreaIndex) + 1
  }

  _isExhausted(attackingCard) {
    return attackingCard.conditions.exhausted
  }

  _getCardHtml(card, owner, overlay, playingFromPlayAreaIndex, playAreaIndex, attackingCard) {
    if (
      overlay && owner === OPPONENT_OWNER &&
      playingFromPlayAreaIndex !== -1 &&
      this._isWithinRange(attackingCard, card, playAreaIndex, playingFromPlayAreaIndex) &&
      !this._isExhausted(attackingCard)
    ) {
      return html`
        <cc-attack-card
            card="${card}"
            on-click="${() => store.dispatch(AttackCard(playAreaIndex))}"></cc-attack-card>`
    }
    if (overlay && owner === PLAYER_OWNER && playingFromPlayAreaIndex === -1) {
      return html`
        <cc-replace-card
            card="${card}"
            on-click="${() => {
              store.dispatch(SpendAllocatedEnergy())
              store.dispatch(PlaceOnPlayArea(playAreaIndex))
            }}"></cc-replace-card>`
    }
    if (!overlay && card && owner === PLAYER_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            cardversion="${card.version}"
            on-click="${() => store.dispatch(PlayFromPlayArea(playAreaIndex))}"></cc-pawn-card>`
    }
    if (overlay && playingFromPlayAreaIndex === playAreaIndex && card && owner === PLAYER_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            cardversion="${card.version}"
            on-click="${() => store.dispatch(SelectPlayerFieldCard(playAreaIndex))}"></cc-pawn-card>`
    }
    if (!overlay && card && owner === OPPONENT_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            cardversion="${card.version}"
            on-click="${() => store.dispatch(SelectOpponentFieldCard(playAreaIndex))}"></cc-pawn-card>`
    }
    return html``
  }
}

window.customElements.define('cc-play-field', CcPlayField);
