import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { store } from '../../store.js';

import './cc-crafting-base-card.js';
import './cc-crafting-part.js';

import { SelectCraftingBaseCard } from '../../actions/app.js';

export class CcCraftingParts extends LitElement {
  _render() {
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
        <cc-crafting-base-card on-click="${() => store.dispatch(SelectCraftingBaseCard())}"></cc-crafting-base-card>
      </div>
      <div class="card-parts">
        <cc-crafting-part></cc-crafting-part>
        <cc-crafting-part></cc-crafting-part>
        <cc-crafting-part></cc-crafting-part>
      </div>
    `
  }
}

window.customElements.define('cc-crafting-parts', CcCraftingParts);
