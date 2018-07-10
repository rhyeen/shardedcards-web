import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import '../card-types/cc-mini-card';

import { 
  SelectHandCard } from '../../../actions/card.js';

export class CcCardHand extends connect(store)(LitElement) {
  _render({_selectedCard, _hand}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          --card-hover-raise-amount: 10px;
          --card-hand-margin: 10px;
          width: calc(100% - var(--card-hand-margin));
          max-width: var(--mini-card-max-width);
          flex: 0 0 var(--card-hand-height);
        }

        cc-mini-card {
          position: absolute;
          width: calc(100% - 42px); /* no idea about the 42... */
          transition: height 0.1s, margin-top 0.1s;
          transition-timing-function: ease-in;
        }

        .card-0 {
          margin-top: 0;
          height: var(--card-hand-height);
        }

        .card-0:hover {
          margin-top: calc(-1*var(--card-hover-raise-amount));
          height: calc(var(--card-hand-height) + var(--card-hover-raise-amount));
        }

        .card-1 {
          margin-top: var(--mini-card-height);
          height: calc(var(--card-hand-height) - var(--mini-card-height));
        }

        .card-1:hover {
          margin-top: calc(var(--mini-card-height) - var(--card-hover-raise-amount));
          height: calc(var(--card-hand-height) + var(--card-hover-raise-amount) - var(--mini-card-height));
        }

        .card-2 {
          margin-top: calc(2*var(--mini-card-height));
          height: calc(var(--card-hand-height) - 2*var(--mini-card-height));
        }

        .card-2:hover {
          margin-top: calc(2*var(--mini-card-height) - var(--card-hover-raise-amount));
          height: calc(var(--card-hand-height) + var(--card-hover-raise-amount) - 2*var(--mini-card-height));
        }

        .card-3 {
          margin-top: calc(3*var(--mini-card-height));
          height: calc(var(--card-hand-height) - 3*var(--mini-card-height));
        }

        .card-3:hover {
          margin-top: calc(3*var(--mini-card-height) - var(--card-hover-raise-amount));
          height: calc(var(--card-hand-height) + var(--card-hover-raise-amount) - 3*var(--mini-card-height));
        }

        .card-4 {
          margin-top: calc(4*var(--mini-card-height));
          height: calc(var(--card-hand-height) - 4*var(--mini-card-height));
        }

        .card-4:hover {
          margin-top: calc(4*var(--mini-card-height) - var(--card-hover-raise-amount));
          height: calc(var(--card-hand-height) + var(--card-hover-raise-amount) - 4*var(--mini-card-height));
        }

        cc-mini-card[active] {
          opacity: 0;
        }
      </style>
      ${ _hand.map((card, index) => html`
      <cc-mini-card
          class$="card-${index}"
          card="${card.card}"
          on-click="${() => store.dispatch(SelectHandCard(card.id, index))}"
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
    this._selectedCard = state.card.selectedHandCard
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
