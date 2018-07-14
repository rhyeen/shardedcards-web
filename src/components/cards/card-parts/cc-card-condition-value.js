import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import {
  IsEmpty } from '../../global/cc-helper-functions.js';

import { ExhaustedIcon } from '../../global/cc-icons.js';

export const CONDITION_TYPE_EXHAUSTED = 'exhausted';

class CcCardConditionValue extends LitElement {
  _render({card, cardversion, valueType}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (IsEmpty(card)) {
      card = {}
    }
    if (!card.conditions) {
      card.conditions = {}
    }
    return html`
      ${CcSharedStyles}

      <style>

        [card-condition] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-condition] .tooltip {
          margin-left: 15px;
        }

        [card-condition] .tooltip-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 300;
        }

        [card-condition] .tooltip-description {
          font-size: 12px;
          color: #757575;
        }
      </style>

      <div card-condition>
        <div class="icon">${this._cardConditionIcon(valueType)}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardConditionTooltip(valueType)}</div>
          <div class="tooltip-description">${this._cardConditionTooltipDescription(valueType)}</div>
        </div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number,
    valueType: String
  }};

  _cardConditionTooltip(valueType) {
    switch (valueType) {
      case CONDITION_TYPE_EXHAUSTED:
        return 'exhausted'
      default:
        return ''
    }
  }

  _cardConditionTooltip(valueType) {
    switch (valueType) {
      case CONDITION_TYPE_EXHAUSTED:
        return 'exhausted'
      default:
        return ''
    }
  }

  _cardConditionTooltipDescription(valueType) {
    switch (valueType) {
      case CONDITION_TYPE_EXHAUSTED:
        return 'Cannot attack this turn.'
      default:
        return ''
    }
  }

  _cardConditionIcon(valueType) {
    let iconFunction
    switch(valueType) {
      case CONDITION_TYPE_EXHAUSTED:
        iconFunction = ExhaustedIcon
        break;
      default:
        return ''
    }
    return iconFunction()
  }
}
window.customElements.define('cc-card-condition-value', CcCardConditionValue);