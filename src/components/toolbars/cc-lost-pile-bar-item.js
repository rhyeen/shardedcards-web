import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { LostCardsIcon } from '../global/cc-icons.js';

export class CcLostPileBarItem extends connect(store)(LitElement) {
  _render({_lostCardsSize}) {
    return html`
      ${CcSharedStyles}

      <div bar-item>
        <div class="current">${_lostCardsSize}</div>
        <div class="icon">${LostCardsIcon()}</div>
      </div>
    `
  }

  static get properties() { return {
    _lostCardsSize: Number,
  }};

  _stateChanged(state) {
    this._lostCardsSize = state.card.lostCardsSize
  }
}

window.customElements.define('cc-lost-pile-bar-item', CcLostPileBarItem);
