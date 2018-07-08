import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import '../card-types/cc-mini-card';

import { 
  SelectCard } from '../../../actions/card.js';

export class CcCardHand extends connect(store)(LitElement) {
  _render({_selectedCard, _hand}) {
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
      ${ _hand.map((card, index) => html`
      <cc-mini-card
          card="${card.card}"
          on-click="${() => store.dispatch(SelectCard(card.id, index))}"
          active?="${_selectedCard.id === card.id}"></cc-mini-card>
      `)}
    `
  }

  static get properties() { return {
    _selectedCard: Object,
    _hand: Array
  }};

  constructor() {
    super()
    this._hand = []
  }

  _stateChanged(state) {
    this._selectedCard = state.card.selectedCard
    this._hand = this._getCardsInHand(state, state.card.hand)
  }

  _getCardsInHand(state, hand) {
    return hand.map((card) => {
      return {
        card: state.card.cards[card.id],
        id: card.id
      }
    })
  }
}

window.customElements.define('cc-card-hand', CcCardHand);
