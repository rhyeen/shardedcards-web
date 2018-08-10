import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../global/cc-shared-styles.js';

import { 
  GetAbilityName,
  GetAbilityDescription,
  GetAbilityIcon,
  ABILITY_SPELLSHOT } from '../../util/card-constants.js';

class CcCraftingPart extends LitElement {
  _render({ability}) {

    //@TODO: just for mocking
    if (!ability) {
      ability = {
        id: ABILITY_SPELLSHOT,
        amount: 4
      }
    }

    return html`
      ${CcSharedStyles}

      <style>

        :host {
          --dark-btn-text-color: #FFF;
        }

        button {
          text-align: left;
          border: none;
          border-radius: 4px;
          padding: 0 16px;
          height: 45px;
          box-shadow: var(--cc-elevation-1);
        }

        button:hover {
          box-shadow: var(--cc-elevation-h1);
        }

        button:active {
          box-shadow: var(--cc-elevation-n1);
        }

        button {
          background-color: #7E57C2;
          color: var(--dark-btn-text-color);
        }

        button[disabled] {
          color: #9E9E9E;
          background-color: #BDBDBD;
          box-shadow: none;
        }

        button[disabled]:hover {
          box-shadow: none;
        }

        button[disabled]:active {
          box-shadow: none;
        }

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
          font-weight: 500;
        }

        [card-ability] .tooltip-description {
          font-size: 12px;
        }

        .button-svg-icon {
          fill: #FFF;
        }

        button[disabled] .button-svg-icon {
          fill: #9E9E9E;
        }
      </style>

      <button card-ability disabled?="${!!ability.used}">
        <div class="icon">${this._cardAbilityIcon(ability)}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip(ability)}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription(ability)}</div>
        </div>
      </button>
    `;
  };
  
  static get properties() { return {
    ability: Object
  }};

  _cardAbilityTooltip(ability) {
    return GetAbilityName(ability)
  }

  _cardAbilityTooltipDescription(ability) {
    return GetAbilityDescription(ability)
  }

  _cardAbilityIcon(ability) {
    return GetAbilityIcon(ability, 'button-svg-icon')
  }
}
window.customElements.define('cc-crafting-part', CcCraftingPart);