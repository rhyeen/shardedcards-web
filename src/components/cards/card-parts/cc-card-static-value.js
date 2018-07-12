import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { AttackIcon,
  EnergyIcon,
  HealthIcon,
  TargetIcon } from '../../global/cc-icons.js';

export const PART_TYPE_ATTACK = 'attack';
export const PART_TYPE_COST = 'cost';
export const PART_TYPE_HEALTH = 'health';
export const PART_TYPE_RANGE = 'range';

class CcCardStaticValue extends LitElement {
  _render({card, cardversion, stack, reduced, valueType}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (!card) {
      card = {
        attack: 0,
        cost: 0,
        health: 0,
        range: 0
      }
    }
    return html`
      ${CcSharedStyles}

      <div card-part class$="${this._cardPartClasses(stack, reduced)}">
        <div class="current">${this._cardPartValue(card, valueType)}</div>
        <div class="icon">${this._cardPartIcon(valueType)}</div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number,
    valueType: String,
    stack: Boolean,
    reduced: Boolean
  }};

  _cardPartValue(card, valueType) {
    switch (valueType) {
      case PART_TYPE_ATTACK:
        return card.attack
      case PART_TYPE_COST:
        return card.cost
      case PART_TYPE_HEALTH:
        return card.health
      case PART_TYPE_RANGE:
        return card.range
      default:
        return 0
    }
  }

  _cardPartIcon(valueType) {
    let iconFunction
    switch(valueType) {
      case PART_TYPE_ATTACK:
        iconFunction = AttackIcon
        break;
      case PART_TYPE_COST:
        iconFunction = EnergyIcon
        break;
      case PART_TYPE_HEALTH:
        iconFunction = HealthIcon
        break;
      case PART_TYPE_RANGE:
        iconFunction = TargetIcon
        break;
      default:
        return ''
    }
    return iconFunction('background-svg-icon')
  }

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
window.customElements.define('cc-card-static-value', CcCardStaticValue);