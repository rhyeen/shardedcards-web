import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { actionUpdateCraftedStyle, actionUpdateCraftedSelectors, actionUpdateCraftedClasses, actionUpdateCraftedText } from '../../actions/crafted.js';

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
          class="cstyles"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props._craftedStyle}">
      <button class="cstyles" on-click="${() => this._updateCraftedStyle()}">STYLES</button>

      <input
          class="cselectors"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props._craftedSelectors}">
      <button class="cselectors" on-click="${() => this._updateCraftedSelectors()}">SELECTORS</button>

      <input
          class="cclasses"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props._craftedClasses}">
      <button class="cclasses" on-click="${() => this._updateCraftedClasses()}">CLASSES</button>

      <input
          class="ctext"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props._craftedText}">
      <button class="ctext" on-click="${() => this._updateCraftedText()}">TEXT</button>
    `;
  };
  
  static get properties() { return {
    _craftedStyle: String,
    _craftedClasses: String,
    _craftedSelectors: String,
    _craftedText: String
  }};

  constructor() {
    super();
  }

  _firstRendered() {
    this._inputCraftedStyle = this.shadowRoot.querySelector('input.cstyles');
    this._buttonCraftedStyle = this.shadowRoot.querySelector('button.cstyles');
    this._inputCraftedSelectors = this.shadowRoot.querySelector('input.cselectors');
    this._buttonCraftedSelectors = this.shadowRoot.querySelector('button.cselectors');
    this._inputCraftedClasses = this.shadowRoot.querySelector('input.cclasses');
    this._buttonCraftedClasses = this.shadowRoot.querySelector('button.cclasses');
    this._inputCraftedText = this.shadowRoot.querySelector('input.ctext');
    this._buttonCraftedText = this.shadowRoot.querySelector('button.ctext');
  }

  _updateCraftedStyle() {
    this._craftedStyle = this._inputCraftedStyle.value;
    store.dispatch(actionUpdateCraftedStyle(this._craftedStyle));
  }

  _updateCraftedSelectors() {
    this._craftedSelectors = this._inputCraftedSelectors.value;
    store.dispatch(actionUpdateCraftedSelectors(this._craftedSelectors));
  }

  _updateCraftedClasses() {
    this._craftedClasses = this._inputCraftedClasses.value;
    store.dispatch(actionUpdateCraftedClasses(this._craftedClasses));
  }

  _updateCraftedText() {
    this._craftedText = this._inputCraftedText.value;
    store.dispatch(actionUpdateCraftedText(this._craftedText));
  }

  _stateChanged(state) {
    this._craftedStyle = state.crafted.craftedStyle;
    this._craftedSelectors = state.crafted.craftedSelectors;
    this._craftedClasses = state.crafted.craftedClasses;
    this._craftedText = state.crafted.craftedText;
  }
}
window.customElements.define('vz-component-editor-pane', VzComponentEditorPane);