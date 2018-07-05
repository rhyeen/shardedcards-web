import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

class CcFullCard extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          display: block;
          width: 200px;
          height: 300px;
          background-color: #FFF;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 8px solid #000;
          border-color: var(${props._borderColor});
          padding: 16px;
        }

        [card-title] {
          text-align: center;
        }
      </style>

      <div card-title>${props._card.title}</div>
    `;
  };
  
  static get properties() { return {
    _card: Object,
    cardid: String,
    _borderColor: String
  }};

  constructor() {
    super()
  }

  _stateChanged(state) {
    this.cardid = state.card.selectedCard.id
    console.log(this.cardid)
    if (!(this.cardid in state.card.cards)) {
      this._card = {
        title: null
      }
      return
    }
    this._card = state.card.cards[this.cardid]
    this._borderColor = CardRarityColor(this._card.rarity)
  }
}
window.customElements.define('cc-full-card', CcFullCard);