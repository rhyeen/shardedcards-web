import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

class CcMiniCard extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --mini-card-height: 34px;
          line-height: var(--mini-card-height);
          display: block;
          height: var(--mini-card-height);
          background-color: var(${props._backgroundColor});
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: var(--mini-card-height);
          padding: 0 16px;
        }
      </style>

      <div card-title>${props._card.title}</div>
    `;
  };
  
  static get properties() { return {
    _card: Object,
    cardid: String,
    _backgroundColor: String
  }};

  constructor() {
    super()
  }

  _stateChanged(state) {
    this._card = state.card[this.cardid]
    this._backgroundColor = CardRarityColor(this._card.rarity)
  }
}
window.customElements.define('cc-mini-card', CcMiniCard);