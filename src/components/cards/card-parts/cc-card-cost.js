import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { EnergyIcon } from '../../global/cc-icons';

class CcCardCost extends LitElement {
  _render({card}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (!card) {
      card = {
        cost: 0
      }
    }
    return html`
      ${CcSharedStyles}

      <style>
        .card-cost-energy-icon {
          fill: var(--default-svg-color);
          width: 18px;
          height: 18px;
        }
      </style>

      <div card-part>
        <div class="current">${card.cost}</div>
        <div class="icon">${EnergyIcon('card-cost-energy-icon')}</div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-card-cost', CcCardCost);