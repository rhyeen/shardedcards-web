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
        :host {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 8px;
          height: var(--nav-footer-height);
          border-bottom: 1px solid var(--near-white-border);
          background-color: var(--base-white);
          align-items: center;
        }

        .item-group {
          display: flex;
          align-items: center;
        }
      </style>
      <div class="item-group left-items">
        <cc-draw-pile-bar-item></cc-draw-pile-bar-item>
        <cc-discard-pile-bar-item></cc-discard-pile-bar-item>
        <cc-lost-pile-bar-item></cc-lost-pile-bar-item>
      </div>

      <div class="item-group right-items">
        <cc-btn btntype="endturn" on-click="${() => this._endTurn()}"></cc-btn>
      </div>
    `
  }

  static get properties() { return {
  }};

  _endTurn() {

  }
}

window.customElements.define('cc-game-footer', CcGameFooter);
