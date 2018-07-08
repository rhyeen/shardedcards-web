import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import '../../components/cards/card-groups/cc-full-card-pane';
import '../../components/cards/card-groups/cc-place-card-pane';
import '../../components/cards/card-groups/cc-card-hand';
import '../../components/play-area/cc-play-area';


export class CcGamePage extends connect(store)(CcPageViewElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          width: 100vw;
          height: calc(100vh - var(--nav-header-height));       
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
          top: var(--nav-header-height);
          width: 100vw;
          height: calc(100vh - var(--nav-header-height));
          background-color: var(--overlay-white);
          z-index: 1;
          transition: opacity 0.2s;
        }

      </style>
      
      <div class="inner-view">
        <cc-play-area></cc-play-area>
        <cc-card-hand></cc-card-hand>
      </div>

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
    this._overlayPaneHtml = this._getHiddenFullCardPaneHtml()
  }

  _getHiddenFullCardPaneHtml() {
    return html``
  }

  _getFullCardPaneHtml() {
    return html`<cc-full-card-pane></cc-full-card-pane>`
  }

  _getPlaceCardPaneHtml() {
    return html`<cc-place-card-pane></cc-place-card-pane>`
  }

  _stateChanged(state) {
    if (state.card.selectedHandCard.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = this._getFullCardPaneHtml()
    } else if (state.card.playFromHand.id) {
      this._showCardOverlay = true
      this._overlayPaneHtml = this._getPlaceCardPaneHtml()
    } else {
      this._showCardOverlay = false
      this._overlayPaneHtml = this._getHiddenFullCardPaneHtml()
    }
  }
}

window.customElements.define('cc-game-page', CcGamePage);
