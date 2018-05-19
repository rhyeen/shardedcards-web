import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { actionUpdateCraftedStyle } from '../../actions/data.js';

class VzComponentEditorPane extends connect(store)(LitElement) {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      <style>
        :host {
            width: 400px;
            background-color: white;
            align-self: stretch;
        }
      </style>

      <div>THIS IS AN EDITOR</div>

      <input
          class="cs"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props.craftedStyle}">
      <button class="cs" on-click="${() => this.updateCraftedStyle()}">UPDATE</button>
    `;
  };
  
  static get properties() { return {
    craftedStyle: String
  }};

  constructor() {
    super();
  }

  _firstRendered() {
    this._input = this.shadowRoot.querySelector('input.cs');
    this._button = this.shadowRoot.querySelector('button.cs');
  }

  updateCraftedStyle() {
    this.craftedStyle = this._input.value;
    store.dispatch(actionUpdateCraftedStyle(this.craftedStyle));
  }

  _stateChanged(state) {
    this.craftedStyle = state.data.craftedStyle;
  }
}
window.customElements.define('vz-component-editor-pane', VzComponentEditorPane);