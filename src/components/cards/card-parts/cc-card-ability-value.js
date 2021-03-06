import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import { 
  GetAbilityName,
  GetAbilityDescription,
  GetAbilityIcon } from '../../../util/card-constants.js';

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
    return GetAbilityName(ability)
  }

  _cardAbilityTooltipDescription(ability) {
    return GetAbilityDescription(ability)
  }

  _cardAbilityIcon(ability) {
    return GetAbilityIcon(ability)
  }
}
window.customElements.define('cc-card-ability-value', CcCardAbilityValue);