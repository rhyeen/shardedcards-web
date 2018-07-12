import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { HealthIcon } from '../../global/cc-icons.js';

class CcCardHealth extends LitElement {
  _render({card, stack, reduced}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (!card) {
      card = {
        health: 0
      }
    }
    return html`
      ${CcSharedStyles}

      <div card-part class$="${this._cardPartClasses(stack, reduced)}">
        <div class="current">${card.health}</div>
        <div class="icon">${HealthIcon('background-svg-icon')}</div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object,
    stack: Boolean,
    reduced: Boolean
  }};

  _cardPartClasses(stack, reduced) {
    const classes = [];
    if (stack) {
      classes.push('stack-card-part')
    }
    if (reduced) {
      classes.push('reduced-card-part')      
    }
    return classes.join(' ');
  }
}
window.customElements.define('cc-card-health', CcCardHealth);