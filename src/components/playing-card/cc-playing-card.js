import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../../data/card-rarity.js';

const CARD_RARITY_UNDEFINED_COLOR = '#FFF';
const CARD_RARITY_COMMON_COLOR = '#222';
const CARD_RARITY_RARE_COLOR = '#3949AB';
const CARD_RARITY_EPIC_COLOR = '#8E24AA';
const CARD_RARITY_LEGENDARY_COLOR = '#FFC107';


class CcPlayingCard extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          width: 200px;
          height: 300px;
          background-color: #FFF;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 8px solid #000;
          padding: 16px;
        }

        :host {
          border-color: ${props._borderColor};
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
    this._card = state.card[this.cardid]
    this._borderColor = this._getBorderColor(this._card.rarity)
  }

  _getBorderColor(rarity) {
    switch (rarity) {
      case CARD_RARITY_UNDEFINED:
        return CARD_RARITY_UNDEFINED_COLOR
      case CARD_RARITY_COMMON:
        return CARD_RARITY_COMMON_COLOR
      case CARD_RARITY_RARE:
        return CARD_RARITY_RARE_COLOR
      case CARD_RARITY_EPIC:
        return CARD_RARITY_EPIC_COLOR
      case CARD_RARITY_LEGENDARY:
        return CARD_RARITY_LEGENDARY_COLOR
      default:
        return CARD_RARITY_COMMON_COLOR
    }
  }
}
window.customElements.define('cc-playing-card', CcPlayingCard);