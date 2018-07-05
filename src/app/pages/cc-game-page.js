import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import '../../components/cards/card-groups/cc-full-card-pane';
import '../../components/cards/card-groups/cc-card-hand';


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
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .overlay[active] {
          display: block;
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
          height: 100vh;
          background-color: var(--overlay-black);
          z-index: 1;
        }

        cc-full-card-pane {
          margin-top: calc(var(--nav-header-height) + 10px);
        }
      </style>
      
      <div class="overlay" active?="${props._showCardOverlay}">
        <cc-full-card-pane></cc-full-card-pane>
      </div>
      <div class="inner-view">
        <div class="placeholder-play-area"></div>
        <cc-card-hand></cc-card-hand>
      </div>
    `
  }

  static get properties() { return {
    _showCardOverlay: Boolean
  }};

  constructor() {
    super()
  }

  _stateChanged(state) {
    this._showCardOverlay = !!state.card.selectedCard.id;
  }
}

window.customElements.define('cc-game-page', CcGamePage);
