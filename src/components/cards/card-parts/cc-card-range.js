import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { TargetIcon } from '../../global/cc-icons.js';

class CcCardRange extends LitElement {
  _render({card}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (!card) {
      card = {
        range: 0
      }
    }
    return html`
      ${CcSharedStyles}

      <style>
      </style>

      <div card-part>
        <div class="current">${card.range}</div>
        <div class="icon">${TargetIcon()}</div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-card-range', CcCardRange);