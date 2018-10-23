import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

class CcCardAbilitySlotValue extends LitElement {
  _render({cardversion, slots}) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          display: flex;
          justify-content: center;
        }

        [card-slots] {
          display: flex;
          align-items: center;
        }

        [card-slots] .title {
          text-transform: uppercase;
          font-size: 14px;
        }
      </style>

      <div card-slots>
        <div class="title">${this._cardAbilitySlotAmount(slots)}</div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number,
    slots: Number
  }};

  _cardAbilitySlotAmount(slots) {
    if (slots === 1) {
      return html`1 slot`;
    } else {
      return html`${slots} slots`;
    }
  }
}
window.customElements.define('cc-card-ability-slot-value', CcCardAbilitySlotValue);