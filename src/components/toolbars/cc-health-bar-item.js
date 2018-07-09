import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { HealthIcon } from '../global/cc-icons';

export class CcHealthBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${HealthIcon('#D81B60')}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-health-bar-item', CcHealthBarItem);
