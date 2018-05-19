import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

class VzComponentEditorPreview extends connect(store)(LitElement) {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      <style>
        :host {
          flex-grow: 1;
        }
      </style>

      <div>THIS IS A PREVIEW</div>

      <div style$="${props.craftedStyle}">${props.craftedStyle}</div>
    `;
  };
  
  static get properties() { return {
    craftedStyle: String
  }};

  constructor() {
    super();
  }

  _stateChanged(state) {
    this.craftedStyle = state.data.craftedStyle;
  }
}
window.customElements.define('vz-component-editor-preview', VzComponentEditorPreview);