import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { InitializeCards } from '../../actions/card.js';

import '../../components/cards/card-groups/cc-hand-card-pane.js';
import '../../components/cards/card-groups/cc-cast-card-pane.js';
import '../../components/cards/card-groups/cc-opponent-card-pane.js';
import '../../components/cards/card-groups/cc-place-card-pane.js';
import '../../components/cards/card-groups/cc-pawn-card-pane.js';
import '../../components/cards/card-groups/cc-card-hand.js';
import '../../components/cards/card-groups/cc-opponent-turn-pane.js';
import '../../components/menus/cc-game-menu-pane.js';
import '../../components/play-area/cc-play-area.js';
import '../../components/toolbars/cc-game-footer.js';
import '../../components/toolbars/cc-game-header.js';


export class CcGamePage extends connect(store)(CcPageViewElement) {
  _render(props) {
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
        <cc-play-area></cc-play-area>
        <cc-card-hand></cc-card-hand>
      </div>
      <cc-game-header></cc-game-header>
      <cc-game-footer></cc-game-footer>

      <div class="overlay" active?="${props._showCardOverlay}">
        ${props._overlayPaneHtml}
      </div>
    `
  }

  static get properties() { return {
    _showCardOverlay: Boolean,
    _overlayPaneHtml: html,
  }};

  constructor() {
    super()
    this._overlayPaneHtml = this._getHiddenPaneHtml()
    store.dispatch(InitializeCards())
  }

  _getHiddenPaneHtml() {
    return html``
  }

  _stateChanged(state) {
    if (!state.turnaction.playersTurn) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-opponent-turn-pane></cc-opponent-turn-pane>`
    } else if (state.card.selectedPlayerFieldCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-cast-card-pane></cc-cast-card-pane>`
    } else if (state.card.selectedOpponentFieldCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-opponent-card-pane></cc-opponent-card-pane>`
    } else if (state.card.selectedHandCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-hand-card-pane></cc-hand-card-pane>`
    } else if (state.card.playFromHand.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-place-card-pane></cc-place-card-pane>`
    } else if (state.card.playFromPlayArea.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-pawn-card-pane></cc-pawn-card-pane>`
    } else if (state.game.showMenu) {
      this._showCardOverlay = true
      this._overlayPaneHtml = html`<cc-game-menu-pane></cc-game-menu-pane>`
    } else {
      this._showCardOverlay = false
      this._overlayPaneHtml = this._getHiddenPaneHtml()
    }
  }
}

window.customElements.define('cc-game-page', CcGamePage);
