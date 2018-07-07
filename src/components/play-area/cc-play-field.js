import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import '../cards/card-types/cc-play-area-card';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../data/owner';

export class CcPlayField extends connect(store)(LitElement) {
  _render(props) {
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
        <cc-play-area-card cardid="${props._leftCardId}" owner$="${props.owner}" overlay?="${props.overlay}"></cc-play-area-card>
      </div>
      <div class="field-pane-separator" overlay?="${props.overlay}"></div>
      <div class="field-pane middle">
        <cc-play-area-card cardid="${props._middleCardId}" owner$="${props.owner}" overlay?="${props.overlay}"></cc-play-area-card>
      </div>
      <div class="field-pane-separator" overlay?="${props.overlay}"></div>
      <div class="field-pane right">
        <cc-play-area-card cardid="${props._rightCardId}" owner$="${props.owner}" overlay?="${props.overlay}"></cc-play-area-card>
      </div>
    `
  }

  static get properties() { return {
    owner: String,
    _leftCardId: String,
    _rightCardId: String,
    _middleCardId: String,
    overlay: Boolean
  }};

  _stateChanged(state) {
    console.log(this.overlay);
    switch(this.owner) {
      case PLAYER_OWNER:
        this._leftCardId = state.card.playerField.left.id
        this._rightCardId = state.card.playerField.right.id
        this._middleCardId = state.card.playerField.middle.id
        break;
      case OPPONENT_OWNER:
        this._leftCardId = state.card.opponentField.left.id
        this._rightCardId = state.card.opponentField.right.id
        this._middleCardId = state.card.opponentField.middle.id
        break;
      default:
        console.error(`Invalid owner: ${this.owner}`)
        this._leftCardId = null
        this._rightCardId = null
        this._middleCardId = null
        break;
    }
  }
}

window.customElements.define('cc-play-field', CcPlayField);
