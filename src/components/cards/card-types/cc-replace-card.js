import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import { PLAYER_OWNER } from '../../../data/owner';

class CcReplaceCard extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          --card-border-width: 2px;
          display: ${props._showCard ? 'block' : 'none'};
          width: calc(var(--pawn-card-width) - 2*var(--card-padding) - 2*var(--card-border-width));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding) - 2*var(--card-border-width));
          background-color: rgba(255, 255, 255, 0.8);
          border: var(--card-border-width) dashed #8D6E63;
          border-radius: 8px;
          padding: var(--card-padding);
        }
      </style>

    `;
  };
  
  static get properties() { return {
    cardid: String,
    owner: String,
    _conditions: Object,
    _showCard: Boolean
  }};

  _stateChanged(state) {
    this._showCard = this.owner === PLAYER_OWNER && state.card.playFromHand.id
    console.log(this.owner);
    console.log(state.card.playFromHand.id);
  }
}
window.customElements.define('cc-replace-card', CcReplaceCard);