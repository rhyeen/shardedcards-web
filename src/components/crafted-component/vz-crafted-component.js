import { LitElement, html } from '@polymer/lit-element';
import { VzSharedStyles } from '../global/vz-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

class VzCraftedComponent extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${VzSharedStyles}    
      <style>
        ${props._craftedSelectors}
      </style>

      <div class$="${props._craftedClasses}" style$="${props._craftedStyle}">${props._craftedText}</div>
    `;
  };
  
  static get properties() { return {
    _craftedStyle: String,
    _craftedSelectors: String,
    _craftedClasses: String,
    _craftedText: String
  }};

  constructor() {
    super();
  }

  _stateChanged(state) {
    this._craftedStyle = state.crafted.craftedStyle;
    this._craftedClasses = state.crafted.craftedClasses;
    this._craftedSelectors = state.crafted.craftedSelectors;
    this._craftedText = state.crafted.craftedText;
  }
}
window.customElements.define('vz-crafted-component', VzCraftedComponent);