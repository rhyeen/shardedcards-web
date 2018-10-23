import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import './cc-crafting-base-card.js';
import './cc-crafting-part.js';

import { SelectCraftingBaseCard } from '../../actions/app.js';

export class CcCraftingParts extends connect(store)(LitElement) {
  _render({_craftingParts, _craftingBaseCard}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }

        .card-base {
          flex: 0 0 calc(var(--pawn-card-height));
        }

        .card-parts {
          padding: 10px 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-height: 180px;
        }
      </style>

      <div class="card-base">
        <cc-crafting-base-card craftingBaseCard="${_craftingBaseCard}" on-click="${() => store.dispatch(SelectCraftingBaseCard())}"></cc-crafting-base-card>
      </div>
      <div class="card-parts">
        <cc-crafting-part craftingPart="${_craftingParts[0]}"></cc-crafting-part>
        <cc-crafting-part craftingPart="${_craftingParts[1]}"></cc-crafting-part>
        <cc-crafting-part craftingPart="${_craftingParts[2]}"></cc-crafting-part>
      </div>
    `
  }

  static get properties() { return {
    _craftingParts: Array,
    _craftingBaseCard: Object
  }};

  _stateChanged(state) {
    this._craftingParts = state.crafting.craftingParts
    this._craftingBaseCard = state.crafting.craftingBaseCard
  }
}

window.customElements.define('cc-crafting-parts', CcCraftingParts);
