import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

class CcPawnCard extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          display: ${props.cardid ? 'block' : 'none'};
          width: calc(var(--pawn-card-width) - 2*var(--card-padding));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding));
          box-shadow: var(--cc-elevation-1);
          border-radius: 8px;
          background-color: var(${props._backgroundColor});
          padding: var(--card-padding);
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
    _conditions: Object,
    cardid: String,
    _backgroundColor: String
  }};

  _stateChanged(state) {
    if (!(this.cardid in state.card.cards)) {
      this._card = {
        title: null
      }
      return
    } else {
      this._card = state.card.cards[this.cardid]
    }
    if (!(this.cardid in state.card.playedCards)) {
      this._conditions = {}
    } else {
      this._conditions = state.card.playedCards[this.cardid]
    }
    
    this._backgroundColor = CardRarityColor(this._card.rarity)
  }
}
window.customElements.define('cc-pawn-card', CcPawnCard);