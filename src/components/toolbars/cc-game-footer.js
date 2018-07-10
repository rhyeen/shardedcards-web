import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import './cc-draw-pile-bar-item.js';
import './cc-discard-pile-bar-item.js';
import './cc-lost-pile-bar-item.js';

export class CcGameFooter extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}

      <style>
      [bar-items] {
        bottom: 0;
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

  }
}

window.customElements.define('cc-game-footer', CcGameFooter);
