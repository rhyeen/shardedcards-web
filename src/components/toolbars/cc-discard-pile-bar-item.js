import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { DiscardIcon } from '../global/cc-icons.js';

export class CcDiscardPileBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${DiscardIcon()}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-discard-pile-bar-item', CcDiscardPileBarItem);
