import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from './cc-shared-styles.js';

export const BTN_TYPE_RESET_GAME = 'resetgame';
export const BTN_TYPE_END_TURN = 'endturn';

class CcBtn extends LitElement {
  _render({btntype, disabled}) {
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

        button.cancel,
        button.resetgame {
          background-color: #f44336;
          color: var(--dark-btn-text-color);
        }

        button.back {
          background-color: #424242;
          color: var(--dark-btn-text-color);
        }

        button.confirm,
        button.play {
          background-color: #2196F3;
          color: var(--dark-btn-text-color);
        }

        button.endturn {
          background-color: #B0BEC5;
          color: var(--dark-btn-text-color);
          padding: 8px 12px;
          line-height: 20px;
          font-size: 16px;
        }

        button[disabled] {
          color: #9E9E9E;
          background-color: #BDBDBD;
          box-shadow: none;
        }

        button[disabled]:hover {
          box-shadow: none;
        }

        button[disabled]:active {
          box-shadow: none;
        }

      </style>

      <button class$="${btntype}" disabled?="${disabled}">${this._getText()}</button>
    `;
  };
  
  static get properties() { return {
    btntype: String,
    text: String,
    disabled: Boolean
  }};

  _getText() {
    if (this.text) {
      return this.text
    } else {
      return this._getBtnTypeText()
    }
  }

  _getBtnTypeText() {
    switch (this.btntype) {
      case BTN_TYPE_RESET_GAME:
        return 'reset game'
      case BTN_TYPE_END_TURN:
        return 'end turn'
      default:
        return this.btntype
    }
  }
}
window.customElements.define('cc-btn', CcBtn);