import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import '../card-types/cc-full-card';

export class CcFullCardPane extends connect(store)(LitElement) {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      </style>
      ${props._fullCardHtml}
    `
  }

  static get properties() { return {
    _selectedCard: Object,
    _fullCardHtml: html
  }};

  constructor() {
    super()
    this._fullCardHtml = this._getDefaultFullCardHtml()
  }

  _getDefaultFullCardHtml() {
    return html``;
  }

  _stateChanged(state) {
    this._selectedCard = state.card.selectedCard;
    if (this._selectedCard.id) {
      this._fullCardHtml = html`<cc-full-card></cc-full-card>`
    } else {
      this._fullCardHtml = this._getDefaultFullCardHtml()
    }
  }
}

window.customElements.define('cc-full-card-pane', CcFullCardPane);
