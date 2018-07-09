import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import './cc-energy-bar-item.js';
import './cc-health-bar-item.js';
import './cc-game-menu-bar-item.js';

export class CcGameHeader extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 8px;
          height: var(--nav-header-height);
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
        <cc-energy-bar-item></cc-energy-bar-item>
        <cc-health-bar-item></cc-health-bar-item>
      </div>

      <div class="item-group right-items">
        <cc-game-menu-bar-item></cc-game-menu-bar-item>
      </div>
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-game-header', CcGameHeader);
