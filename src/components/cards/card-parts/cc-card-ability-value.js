import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { EnergizeIcon } from '../../global/cc-icons.js';

import { ABILITY_ENERGIZE } from '../../../util/card-constants.js';

class CcCardAbilityValue extends LitElement {
  _render({cardversion, ability}) {
    return html`
      ${CcSharedStyles}

      <style>

        [card-ability] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-ability] .tooltip {
          margin-left: 15px;
        }

        [card-ability] .tooltip-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 300;
        }

        [card-ability] .tooltip-description {
          font-size: 12px;
          color: #757575;
        }
      </style>

      <div card-ability>
        <div class="icon">${this._cardAbilityIcon(ability)}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip(ability)}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription(ability)}</div>
        </div>
      </div>
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number,
    ability: Object
  }};

  _cardAbilityTooltip(ability) {
    switch (ability.id) {
      case ABILITY_ENERGIZE:
        return 'energize'
      default:
        return ''
    }
  }

  _cardAbilityTooltipDescription(ability) {
    switch (ability.id) {
      case ABILITY_ENERGIZE:
        return `+${ability.amount} max and current energy.`
      default:
        return ''
    }
  }

  _cardAbilityIcon(ability) {
    let iconFunction
    switch(ability.id) {
      case ABILITY_ENERGIZE:
        iconFunction = EnergizeIcon
        break;
      default:
        return ''
    }
    return iconFunction()
  }
}
window.customElements.define('cc-card-ability-value', CcCardAbilityValue);