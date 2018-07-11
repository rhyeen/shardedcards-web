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
      [bar-items] {
        top: 0;
      }

      cc-health-bar-item {
        margin-left: 20px;
      }
      </style>

      <div bar-items>
        <div class="item-group left-items">
          <cc-energy-bar-item></cc-energy-bar-item>
          <cc-health-bar-item></cc-health-bar-item>
        </div>

        <div class="item-group right-items">
          <cc-game-menu-bar-item></cc-game-menu-bar-item>
        </div>
      </div>
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-game-header', CcGameHeader);
