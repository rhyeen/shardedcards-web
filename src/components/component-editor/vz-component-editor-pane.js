import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { 
  actionUpdateCraftedStyle,
  actionUpdateCraftedClasses,
  actionUpdateCraftedText,
  saveCraftedComponent } from '../../actions/crafted.js';
import { VzSharedStyles } from '../global/vz-shared-styles.js';

class VzComponentEditorPane extends connect(store)(LitElement) {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      ${VzSharedStyles}      
      <style>
        :host {
          --component-editor-pane-padding: 40px;
          width: calc(400px - var(--component-editor-pane-padding) - var(--component-editor-pane-padding));
          background-color: var(--base-white);
          align-self: stretch;
          box-shadow: var(--vz-elevation-side-bar);
          padding: var(--component-editor-pane-padding);
        }

        h2 {
          line-height: 24px;
          font-size: 24px;
          font-weight: 300;
          color: var(--off-black);
          margin: 0 0 24px 0;
        }

        button {
          margin-bottom: 24px;
        }
      </style>

      <h2>EDITOR</h2>

      <input
          class="cstyles"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          autocapitalize="none"
          value="${props._craftedStyle}">
      <button class="cstyles" on-click="${() => this._updateCraftedStyle()}">STYLES</button>

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

      <button class="csave" on-click="${() => this._saveCraftedComponent()}">SAVE</button>
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

  _firstRendered() {
    this._inputCraftedStyle = this.shadowRoot.querySelector('input.cstyles');
    this._buttonCraftedStyle = this.shadowRoot.querySelector('button.cstyles');
    this._inputCraftedClasses = this.shadowRoot.querySelector('input.cclasses');
    this._buttonCraftedClasses = this.shadowRoot.querySelector('button.cclasses');
    this._inputCraftedText = this.shadowRoot.querySelector('input.ctext');
    this._buttonCraftedText = this.shadowRoot.querySelector('button.ctext');
  }

  _updateCraftedStyle() {
    this._craftedStyle = this._inputCraftedStyle.value;
    store.dispatch(actionUpdateCraftedStyle(this._craftedStyle));
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
    this._craftedClasses = state.crafted.craftedClasses;
    this._craftedText = state.crafted.craftedText;
  }

  _saveCraftedComponent() {
    store.dispatch(saveCraftedComponent(
      'test',
      this._craftedStyle,
      this._craftedClasses,
      this._craftedText
    ));
  }
}
window.customElements.define('vz-component-editor-pane', VzComponentEditorPane);