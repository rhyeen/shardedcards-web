import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { EnergyIcon } from '../global/cc-icons';

export class CcEnergyBarItem extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      
      ${EnergyIcon('#42A5F5')}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-energy-bar-item', CcEnergyBarItem);
