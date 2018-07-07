import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import './cc-replace-card';
import './cc-pawn-card';

class CcPlayAreaCard extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}

      <style>

        :host {
          --card-padding: 0;
          position: relative;
          width: 90px;
          height: 140px;
          width: var(--pawn-card-width);
          height: var(--pawn-card-height);
        }

        cc-replace-card {
          position: absolute;
        }

        cc-pawn-card {
          position: absolute;
        }
      </style>

      ${props._playAreaCardHtml}
    `;
  };
  
  static get properties() { return {
    cardid: String,
    owner: String,
    _playAreaCardHtml: html,
    overlay: Boolean
  }};

  constructor() {
    super()
  }

  _firstRendered() {
    if (this.overlay) {
      this._playAreaCardHtml = html`<cc-replace-card cardid$="${this.cardid}" owner$="${this.owner}"></cc-replace-card>`
    } else {
      this._playAreaCardHtml = html`<cc-pawn-card cardid$="${this.cardid}"></cc-pawn-card>`
    }
    this._requestRender()
  }
}
window.customElements.define('cc-play-area-card', CcPlayAreaCard);