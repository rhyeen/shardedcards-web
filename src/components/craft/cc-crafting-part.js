import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { 
  GetAbilityName,
  GetAbilityDescription,
  GetAbilityIcon } from '../../util/card-constants.js';

class CcCraftingPart extends connect(store)(LitElement) {
  _render({craftingPart, _cardInForge}) {

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

        [craft-part] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [craft-part] .tooltip {
          margin-left: 15px;
        }

        [craft-part] .tooltip-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 500;
        }

        [craft-part] .tooltip-description {
          font-size: 12px;
        }

        .button-svg-icon {
          fill: #FFF;
        }

        button[disabled] .button-svg-icon {
          fill: #9E9E9E;
        }
      </style>

      <button craft-part disabled?="${!_cardInForge}">
        <div class="icon">${this._cardPartIcon(craftingPart)}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardPartTooltip(craftingPart)}</div>
          <div class="tooltip-description">${this._cardPartTooltipDescription(craftingPart)}</div>
        </div>
      </button>
    `;
  };
  
  static get properties() { return {
    craftingPart: Object,
    _cardInForge: Boolean
  }};

  _stateChanged(state) {
    this._cardInForge = this._isCardInForge(state.crafting.forge)
  }

  _isCardInForge(forges) {
    for (let forge of forges) {
      if (forge.card.id) {
        return true
      }
    }
    return false
  }

  _cardPartTooltip(craftingPart) {
    return GetAbilityName(craftingPart)
  }

  _cardPartTooltipDescription(craftingPart) {
    return GetAbilityDescription(craftingPart)
  }

  _cardPartIcon(craftingPart) {
    return GetAbilityIcon(craftingPart, 'button-svg-icon')
  }
}
window.customElements.define('cc-crafting-part', CcCraftingPart);