import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from './cc-shared-styles.js';

class CcBtn extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --dark-btn-text-color: #FFF;
          --light-btn-text-color: #212121;
        }

        button {
          border: none;
          line-height: 40px;
          font-size: 18px;
          text-transform: uppercase;
          border-radius: 4px;
          padding: 0 16px;
          font-weight: 500;
          box-shadow: var(--cc-elevation-1);
        }

        button:hover {
          box-shadow: var(--cc-elevation-h1);
        }

        button:active {
          box-shadow: var(--cc-elevation-n1);
        }

        button.cancel {
          background-color: #f44336;
          color: var(--dark-btn-text-color);
        }

        button.confirm {
          background-color: #2196F3;
          color: var(--dark-btn-text-color);
        }

      </style>

      <button class$="${props.btntype}">${this._getText()}</button>
    `;
  };
  
  static get properties() { return {
    btntype: String,
    text: String
  }};

  _getText() {
    if (this.text) {
      return this.text
    } else {
      return this._getBtnTypeText()
    }
  }

  _getBtnTypeText() {
    return this.btntype
  }
}
window.customElements.define('cc-btn', CcBtn);