import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

class CcCraftedComponent extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <div class$="${props._craftedClasses}" style$="${props._craftedStyle}">${props._craftedText}</div>
    `;
  };
  
  static get properties() { return {
    _craftedStyle: String,
    _craftedClasses: String,
    _craftedText: String
  }};

  constructor() {
    super();
  }

  _stateChanged(state) {
    this._craftedStyle = state.crafted.craftedStyle;
    this._craftedClasses = state.crafted.craftedClasses;
    this._craftedText = state.crafted.craftedText;
  }
}
window.customElements.define('cc-crafted-component', CcCraftedComponent);