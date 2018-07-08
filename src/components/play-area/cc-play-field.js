import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import '../cards/card-types/cc-pawn-card';
import '../cards/card-types/cc-replace-card';
import '../cards/card-types/cc-attack-card';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../data/owner';

  import { 
    PlaceOnPlayArea,
    PlayFromPlayArea,
    SelectOpponentFieldCard,
    SelectPlayerFieldCard,
    AttackCard } from '../../actions/card.js';

export class CcPlayField extends connect(store)(LitElement) {
  _render({_leftCard, _middleCard, _rightCard, overlay, _playingFromPlayAreaIndex, owner}) {
    let leftCardHtml = this._getCardHtml(_leftCard, owner, overlay, _playingFromPlayAreaIndex, 0)
    let middleCardHtml = this._getCardHtml(_middleCard, owner, overlay, _playingFromPlayAreaIndex, 1)
    let rightCardHtml = this._getCardHtml(_rightCard, owner, overlay, _playingFromPlayAreaIndex, 2)
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
        }

        .field-pane {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .field-pane-separator {
          flex: 0 0 2px;
          height: 100%;
          background-color: #EEEEEE;
        }

        .field-pane-separator[overlay] {
          background: none;
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
    _playingFromPlayAreaIndex: Number
  }};

  _stateChanged(state) {
    this._playingFromPlayAreaIndex = !!state.card.playFromPlayArea.id ? state.card.playFromPlayArea.playAreaIndex : -1
    switch(this.owner) {
      case PLAYER_OWNER:
        this._leftCard = this._getCard(state, state.card.playerField[0].id)
        this._middleCard = this._getCard(state, state.card.playerField[1].id)
        this._rightCard = this._getCard(state, state.card.playerField[2].id)
        break;
      case OPPONENT_OWNER:
        this._leftCard = this._getCard(state, state.card.opponentField[0].id)
        this._middleCard = this._getCard(state, state.card.opponentField[1].id)
        this._rightCard = this._getCard(state, state.card.opponentField[2].id)
        break;
      default:
        console.error(`Invalid owner: ${this.owner}`)
        this._leftCard = null
        this._rightCard = null
        this._middleCard = null
        break;
    }
  }

  _getCard(state, cardId) {
    if (!cardId) {
      return null
    }
    return state.card.cards[cardId]
  }

  _getCardHtml(card, owner, overlay, playingFromPlayAreaIndex, playAreaIndex) {
    if (overlay && owner === OPPONENT_OWNER && playingFromPlayAreaIndex !== -1) {
      return html`
        <cc-attack-card
            card="${card}"
            on-click="${() => store.dispatch(AttackCard(playAreaIndex))}"></cc-attack-card>`
    }
    if (overlay && owner === PLAYER_OWNER && playingFromPlayAreaIndex === -1) {
      return html`
        <cc-replace-card
            card="${card}"
            on-click="${() => store.dispatch(PlaceOnPlayArea(playAreaIndex))}"></cc-replace-card>`
    }
    if (!overlay && card && owner === PLAYER_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            on-click="${() => store.dispatch(PlayFromPlayArea(playAreaIndex))}"></cc-pawn-card>`
    }
    if (overlay && playingFromPlayAreaIndex === playAreaIndex && card && owner === PLAYER_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            on-click="${() => store.dispatch(SelectPlayerFieldCard(playAreaIndex))}"></cc-pawn-card>`
    }
    if (!overlay && card && owner === OPPONENT_OWNER) {
      return html`
        <cc-pawn-card
            card="${card}"
            on-click="${() => store.dispatch(SelectOpponentFieldCard(playAreaIndex))}"></cc-pawn-card>`
    }
    return html``
  }
}

window.customElements.define('cc-play-field', CcPlayField);
