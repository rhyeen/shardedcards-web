import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import '../card-types/cc-mini-card';

import { 
  SelectCard } from '../../../actions/card.js';

export class CcCardHand extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          --card-hand-margin: 10px;
          width: calc(100% - var(--card-hand-margin));
          max-width: var(--mini-card-max-width);
          margin: var(--card-hand-margin);
          flex: 0 0 var(--card-hand-height);
        }

        cc-mini-card {
          --mini-card-overlay: calc(2*var(--mini-card-height) - var(--mini-card-margin));
          height: calc(var(--mini-card-height) + var(--mini-card-overlay));
          margin-bottom: calc(-1*var(--mini-card-overlay));
        }

        cc-mini-card:last-child {
          --mini-card-overlay: calc(var(--mini-card-height) - var(--mini-card-margin));
          height: calc(var(--mini-card-height) + var(--mini-card-overlay));
          margin-bottom: calc(-1*var(--mini-card-overlay));
        }

        cc-mini-card[active] {
          opacity: 0;
        }
      </style>
      <cc-mini-card
          cardid="test"
          on-click="${() => this._selectCard('test')}"
          active?="${this._selectedCard.id === 'test'}"></cc-mini-card>
      <cc-mini-card
          cardid="beast"
          on-click="${() => this._selectCard('beast')}"
          active?="${this._selectedCard.id === 'beast'}"></cc-mini-card>
      <cc-mini-card
          cardid="monster"
          on-click="${() => this._selectCard('monster')}"
          active?="${this._selectedCard.id === 'monster'}"></cc-mini-card>
      <cc-mini-card
          cardid="hero"
          on-click="${() => this._selectCard('hero')}"
          active?="${this._selectedCard.id === 'hero'}"></cc-mini-card>
      <cc-mini-card
          cardid="pawn"
          on-click="${() => this._selectCard('pawn')}"
          active?="${this._selectedCard.id === 'pawn'}"></cc-mini-card>
    `
  }

  static get properties() { return {
    _selectedCard: Object
  }};

  _selectCard(cardId) {
    store.dispatch(SelectCard(cardId))
  }

  _stateChanged(state) {
    this._selectedCard = state.card.selectedCard
  }
}

window.customElements.define('cc-card-hand', CcCardHand);
