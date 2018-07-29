import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { ResetGame } from '../../actions/app.js';

import {
  GAME_STATE_LOSE,
  GAME_STATE_WIN } from '../../reducers/game.js';

import '../global/cc-btn.js';

export class CcEndGamePane extends connect(store)(LitElement) {
  _render({_endGameText}) {
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
      <div class="end-game-text">${_endGameText}</div>
      <cc-btn btntype="resetgame" on-click="${() => this._resetGame()}"></cc-btn>
    `
  }

  static get properties() { return {
    _endGameText: String
  }};

  _stateChanged(state) {
    switch(state.game.gameState) {
      case GAME_STATE_LOSE:
        return this._endGameText = 'You lose!'
      case GAME_STATE_WIN:
        return this._endGameText = 'You win'
      default:
        console.error(`Unexpected game state: ${state.game.gameState}`)
    }
    if (state.game.gameState === GAME_STATE_LOSE) {

    }
  }

  _resetGame() {
    store.dispatch(ResetGame())
  }
}

window.customElements.define('cc-end-game-pane', CcEndGamePane);
