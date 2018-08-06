import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import '../../components/cards/card-groups/cc-hand-card-pane.js';
import '../../components/cards/card-groups/cc-unit-card-pane.js';
import '../../components/cards/card-groups/cc-opponent-card-pane.js';
import '../../components/cards/card-groups/cc-place-card-pane.js';
import '../../components/cards/card-groups/cc-pawn-card-pane.js';
import '../../components/cards/card-groups/cc-card-hand.js';
import '../../components/cards/card-groups/cc-cast-card-pane.js';
import '../../components/cards/card-groups/cc-opponent-turn-pane.js';
import '../../components/cards/card-groups/cc-cast-target-pane.js';
import '../../components/menus/cc-game-menu-pane.js';
import '../../components/menus/cc-end-game-pane.js';
import '../../components/play-area/cc-play-area.js';
import '../../components/craft/cc-crafting-forge.js';
import '../../components/craft/cc-crafting-parts.js';
import '../../components/toolbars/cc-game-footer.js';
import '../../components/toolbars/cc-game-header.js';
import { ResetGame } from '../../actions/app.js';
import { 
  GAME_STATE_PLAYING,
  GAME_STATE_CRAFTING } from '../../reducers/game.js';

export class CcGamePage extends connect(store)(CcPageViewElement) {
  _render({_innerViewHtml, _showCardOverlay, _overlayPaneHtml, _gameState}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          width: 100vw;
          height: calc(100vh - var(--nav-header-height) - var(--nav-footer-height));       
          margin-top: var(--nav-header-height);      
        }

        .inner-view {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .overlay[active] {
          display: flex;
        }

        .overlay {
          display: none;
          justify-content: center;
          position: fixed;
          top: 0;
          width: 100vw;
          height: calc(100vh - var(--nav-header-height) - var(--nav-footer-height));
          background-color: var(--overlay-white);
          z-index: 1;
          padding: var(--nav-header-height) 0 var(--nav-footer-height) 0;
        }

      </style>
      
      <div class="inner-view">
        ${_innerViewHtml}
      </div>
      <cc-game-header></cc-game-header>
      <cc-game-footer gameState="${_gameState}"></cc-game-footer>

      <div class="overlay" active?="${_showCardOverlay}">
        ${_overlayPaneHtml}
      </div>
    `
  }

  static get properties() { return {
    _showCardOverlay: Boolean,
    _overlayPaneHtml: html,
    _innerViewHtml: html,
    _gameState: String
  }};

  constructor() {
    super()
    this._overlayPaneHtml = this._getHiddenPaneHtml()
    this._innerViewHtml = this._getPlayGameHtml()
    store.dispatch(ResetGame())
  }

  _getHiddenPaneHtml() {
    return html``
  }

  _getPlayGameHtml() {
    return html`
      <cc-play-area></cc-play-area>
      <cc-card-hand></cc-card-hand>
    `
  }

  _getCraftCardsHtml() {
    return html`
      <cc-crafting-forge></cc-crafting-forge>
      <cc-crafting-parts></cc-crafting-parts>
    `
  }

  _stateChanged(state) {
    this._gameState = state.game.gameState
    this._setOverlayPaneHtml(state)
    this._setInnerViewHtml(state)
  }

  _setInnerViewHtml(state) {
    if (state.game.gameState === GAME_STATE_CRAFTING) {
      this._innerViewHtml = this._getCraftCardsHtml()
    } else {
      this._innerViewHtml = this._getPlayGameHtml()
    }
  }

  _setOverlayPaneHtml(state) {
    if (!state.turnaction.playersTurn) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-opponent-turn-pane></cc-opponent-turn-pane>`
    } else if (state.card.selectedPlayerFieldCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-unit-card-pane></cc-unit-card-pane>`
    } else if (state.card.selectedCastingCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-cast-card-pane></cc-cast-card-pane>`
    } else if (state.card.selectedOpponentFieldCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-opponent-card-pane></cc-opponent-card-pane>`
    } else if (state.card.selectedHandCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-hand-card-pane></cc-hand-card-pane>`
    } else if (state.card.selectedTargetOpponentAbility.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-cast-target-pane></cc-cast-target-pane>`      
    } else if (state.card.selectedTargetUnitAbility.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-cast-target-pane></cc-cast-target-pane>`      
    } else if (state.card.playFromHand.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-place-card-pane></cc-place-card-pane>`
    } else if (state.card.playFromPlayArea.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-pawn-card-pane></cc-pawn-card-pane>`
    } else if (state.game.showMenu) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-game-menu-pane></cc-game-menu-pane>`
    } else if (state.game.gameState !== GAME_STATE_PLAYING && state.game.gameState !== GAME_STATE_CRAFTING) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-end-game-pane></cc-end-game-pane>`
    } else {
      this._showCardOverlay = false
      this._overlayPaneHtml = this._getHiddenPaneHtml()
    }
  }
}

window.customElements.define('cc-game-page', CcGamePage);
