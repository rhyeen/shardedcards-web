import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { DrawIcon } from '../global/cc-icons';

export class CcDrawPileBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${DrawIcon()}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-draw-pile-bar-item', CcDrawPileBarItem);
