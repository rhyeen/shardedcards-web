import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import {
  IsEmpty } from '../../global/cc-helper-functions.js';

import { AttackIcon,
  EnergyIcon,
  HealthIcon,
  RangeIcon,
  ShieldIcon } from '../../global/cc-icons.js';

export const PART_TYPE_ATTACK = 'attack';
export const PART_TYPE_COST = 'cost';
export const PART_TYPE_HEALTH = 'health';
export const PART_TYPE_RANGE = 'range';
export const PART_TYPE_SHIELD = 'shield';

class CcCardStaticValue extends LitElement {
  _render({card, cardversion, stack, reduced, valueType}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (IsEmpty(card)) {
      card = {
        attack: 0,
        cost: 0,
        health: 0,
        range: 0,
        conditions: {}
      }
    }
    if (!card.conditions) {
      card.conditions = {}
    }
    return html`
      ${CcSharedStyles}

      <style>
      :host {
        display: ${this._getDisplay(card, valueType)};
        opacity: ${this._getOpacity(card, valueType)};
      }

      [card-part] {
        display: flex;
        align-items: center;
        font-size: 18px;
      }

      [card-part].reduced-card-part {
        font-size: 14px;
      }

      [card-part].stack-card-part {
        flex-direction: column;
      }

      [card-part].no-value-card-part {
        display: none;
      }

      [card-part] .icon .background-svg-icon {
        fill: var(--default-svg-color);
      }

      [card-part].reduced-card-part .icon .background-svg-icon {
        width: 15px;
        height: 15px;
      }
      </style>

      <div card-part class$="${this._cardPartClasses(card, valueType, stack, reduced)}">
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

  _getDisplay(card, valueType) {
    if (valueType === PART_TYPE_SHIELD && !card.conditions.shield) {
      return 'none'
    }
    return 'block'
  }

  _getOpacity(card, valueType) {
    return '1'
    // @NOTE: Having the opacity of the whole card reduced when exhausted instead of just target.
    // switch (valueType) {
    //   case PART_TYPE_RANGE:
    //     if (card.conditions.exhausted) {
    //       return '0.3'
    //     }
    // }
    // return '1'
  }

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
      case PART_TYPE_SHIELD:
        return card.conditions.shield
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
        iconFunction = RangeIcon
        break;
      case PART_TYPE_SHIELD:
        iconFunction = ShieldIcon
        break;
      default:
        return ''
    }
    return iconFunction('background-svg-icon')
  }

  _cardPartClasses(card, valueType, stack, reduced) {
    const classes = [];
    if (stack) {
      classes.push('stack-card-part')
    }
    if (reduced) {
      classes.push('reduced-card-part')      
    }
    const cardValue = this._cardPartValue(card, valueType)
    if (!cardValue && cardValue !== 0) {
      classes.push('no-value-card-part')
    }
    return classes.join(' ');
  }
}
window.customElements.define('cc-card-static-value', CcCardStaticValue);