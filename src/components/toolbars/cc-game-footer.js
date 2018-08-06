import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import './cc-draw-pile-bar-item.js';
import './cc-discard-pile-bar-item.js';
import './cc-lost-pile-bar-item.js';

import { store } from '../../store.js';

import { 
  EndTurn,
  FinishCrafting } from '../../actions/app.js';

import { 
  GAME_STATE_CRAFTING,
  GAME_STATE_PLAYING } from '../../reducers/game.js';

export class CcGameFooter extends LitElement {
  _render() {
    const barItemsHtml = this._getBarItemsHtml()
    return html`
      ${CcSharedStyles}

      <style>
      [bar-items] {
        bottom: 0;
        border-top: 1px solid var(--near-white-border);
      }

      cc-discard-pile-bar-item,
      cc-lost-pile-bar-item {
        margin-left: 20px;
      }
      </style>

      <div bar-items>
        ${barItemsHtml}
      </div>
    `
  }

  static get properties() { return {
    gameState: String
  }};

  _endTurn() {
    store.dispatch(EndTurn())
  }

  _finishCrafting() {
    store.dispatch(FinishCrafting())
  }

  _getBarItemsHtml() {
    switch (this.gameState) {
      case GAME_STATE_CRAFTING:
        return this._getCraftingBarItemsHtml()
      case GAME_STATE_PLAYING:
        return this._getPlayingBarItemsHtml()
      default:
        console.error('Unexpected game state')
        return html``
    }
  }

  _getPlayingBarItemsHtml() {
    return html`
      <div class="item-group left-items">
        <cc-draw-pile-bar-item></cc-draw-pile-bar-item>
        <cc-discard-pile-bar-item></cc-discard-pile-bar-item>
        <cc-lost-pile-bar-item></cc-lost-pile-bar-item>
      </div>

      <div class="item-group right-items">
        <cc-btn btntype="endturn" on-click="${() => this._endTurn()}"></cc-btn>
      </div>
    `
  }

  _getCraftingBarItemsHtml() {
    return html`
      <div class="item-group left-items">
      </div>

      <div class="item-group right-items">
        <cc-btn btntype="finishcrafting" on-click="${() => this._finishCrafting()}"></cc-btn>
      </div>
    `
  }
}

window.customElements.define('cc-game-footer', CcGameFooter);
