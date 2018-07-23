import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { store } from '../../store.js';

import { 
  HideInGameMenu,
  ResetGame } from '../../actions/game.js';

import '../global/cc-btn.js';

export class CcGameMenuPane extends LitElement {
  _render() {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        cc-btn:first-child {
          margin-top: 0;
        }

        cc-btn {
          margin-top: 20px;
        }
      </style>
      <cc-btn btntype="resetgame" on-click="${() => this._resetGame()}"></cc-btn>
      <cc-btn btntype="back" on-click="${() => this._cancel()}"></cc-btn>
    `
  }

  static get properties() { return {
  }};

  _cancel() {
    store.dispatch(HideInGameMenu())
  }

  _resetGame() {
    store.dispatch(HideInGameMenu())
    store.dispatch(ResetGame())
  }
}

window.customElements.define('cc-game-menu-pane', CcGameMenuPane);
