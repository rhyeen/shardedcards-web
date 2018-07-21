import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import './cc-draw-pile-bar-item.js';
import './cc-discard-pile-bar-item.js';
import './cc-lost-pile-bar-item.js';

import { store } from '../../store.js';

import { EndTurn } from '../../actions/turnaction.js';
import { ClearHand } from '../../actions/card.js';

export class CcGameFooter extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}

      <style>
      [bar-items] {
        bottom: 0;
        border-top: 1px solid var(--near-white-border);
      }

      cc-discard-pile-bar-item,
      cc-lost-pile-bar-item {
        margin-left: 20px;
      }
      </style>

      <div bar-items>
        <div class="item-group left-items">
          <cc-draw-pile-bar-item></cc-draw-pile-bar-item>
          <cc-discard-pile-bar-item></cc-discard-pile-bar-item>
          <cc-lost-pile-bar-item></cc-lost-pile-bar-item>
        </div>

        <div class="item-group right-items">
          <cc-btn btntype="endturn" on-click="${() => this._endTurn()}"></cc-btn>
        </div>
      </div>
    `
  }

  static get properties() { return {
  }};

  _endTurn() {
    store.dispatch(ClearHand())
    store.dispatch(EndTurn(store.getState().turnaction.pendingTurn))
  }
}

window.customElements.define('cc-game-footer', CcGameFooter);
