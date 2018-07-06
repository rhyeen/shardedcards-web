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
          --card-border-radius: 16px;
          --card-padding: 16px;
          line-height: var(--mini-card-height);
          display: block;
          max-width: calc(var(--mini-card-max-width) - 2*var(--card-padding));
          height: var(--mini-card-height);
          background-color: var(${props._backgroundColor});
          box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.15);
          border-top-left-radius: var(--card-border-radius);
          border-top-right-radius: var(--card-border-radius);
          padding: 0 var(--card-padding);
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

  _stateChanged(state) {
    this._card = state.card.cards[this.cardid]
    this._backgroundColor = CardRarityColor(this._card.rarity)
  }
}
window.customElements.define('cc-mini-card', CcMiniCard);