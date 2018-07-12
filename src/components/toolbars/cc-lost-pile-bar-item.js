import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { LostCardsIcon } from '../global/cc-icons.js';

export class CcLostPileBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${LostCardsIcon()}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-lost-pile-bar-item', CcLostPileBarItem);
