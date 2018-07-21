import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { DiscardIcon } from '../global/cc-icons.js';

export class CcDiscardPileBarItem extends connect(store)(LitElement) {
  _render({_discardPileSize}) {
    return html`
      ${CcSharedStyles}

      <div bar-item>
        <div class="current">${_discardPileSize}</div>
        <div class="icon">${DiscardIcon()}</div>
      </div>
    `
  }

  static get properties() { return {
    _discardPileSize: Number,
  }};

  _stateChanged(state) {
    this._discardPileSize = state.card.discardPileSize
  }
}

window.customElements.define('cc-discard-pile-bar-item', CcDiscardPileBarItem);
