import { html, LitElement } from '@polymer/lit-element';

import {
  CcSharedStyles,
  CardRarityColor } from '../global/cc-shared-styles.js';

import {
  CARD_RARITY_COMMON } from '../../util/card-constants.js';
  
import {
  PART_TYPE_ATTACK,
  PART_TYPE_HEALTH,
  PART_TYPE_RANGE,
  PART_TYPE_SHIELD, 
  PART_TYPE_COST} from '../cards/card-parts/cc-card-static-value.js';

import '../cards/card-parts/cc-card-ability-slot-value.js';

export class CcCraftingBaseCard extends LitElement {
  _render({craftingBaseCard}) {
    
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          --card-padding: 4px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding));
          box-shadow: var(--cc-elevation-1);
          border-radius: 8px;
          background-color: var(${CardRarityColor(craftingBaseCard.rarity)});
          padding: var(--card-padding);
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: center;
        }

        [card-title] {
          text-align: center;
        }

        cc-card-static-value:first-child {
          margin-left: 0px;
        }

        cc-card-static-value {
          margin-left: 5px;
        }
      </style>

      <header>
        <cc-card-static-value card="${craftingBaseCard}" cardversion$="${0}" valueType="${PART_TYPE_COST}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
      </header>
      <div class="card-body">
        <cc-card-ability-slot-value card="${craftingBaseCard}" cardversion$="${0}" slots="${craftingBaseCard.slots}"></cc-card-ability-slot-value>
      </div>
      <footer>
        <cc-card-static-value card="${craftingBaseCard}" cardversion$="${0}" valueType="${PART_TYPE_RANGE}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${craftingBaseCard}" cardversion$="${0}" valueType="${PART_TYPE_ATTACK}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${craftingBaseCard}" cardversion$="${0}" valueType="${PART_TYPE_HEALTH}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${craftingBaseCard}" cardversion$="${0}" valueType="${PART_TYPE_SHIELD}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
      </footer>
    `
  }

  static get properties() { return {
    craftingBaseCard: Object
  }};
}

window.customElements.define('cc-crafting-base-card', CcCraftingBaseCard);
