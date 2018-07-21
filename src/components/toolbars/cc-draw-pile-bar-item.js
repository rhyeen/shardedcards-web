import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { DrawIcon } from '../global/cc-icons.js';

export class CcDrawPileBarItem extends connect(store)(LitElement) {
  _render({_deckSize}) {
    return html`
      ${CcSharedStyles}
      
      <div bar-item>
        <div class="current">${_deckSize}</div>
        <div class="icon">${DrawIcon()}</div>
      </div>
    `
  }

  static get properties() { return {
    _deckSize: Number,
  }};

  _stateChanged(state) {
    this._deckSize = state.card.deckSize
  }
}

window.customElements.define('cc-draw-pile-bar-item', CcDrawPileBarItem);
