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
          margin: 10px;
        }

        cc-mini-card {
          margin-bottom: 4px;
        }

        cc-mini-card:last-child {
          margin-bottom: 0px;
        }

        cc-mini-card[active] {
          border: 3px solid #000;
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
    store.dispatch(SelectCard(cardId));
  }

  _stateChanged(state) {
    this._selectedCard = state.card.selectedCard;
  }
}

window.customElements.define('cc-card-hand', CcCardHand);
