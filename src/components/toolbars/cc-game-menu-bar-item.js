import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { MenuIcon } from '../global/cc-icons.js';

export class CcGameMenuBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${MenuIcon()}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-game-menu-bar-item', CcGameMenuBarItem);
