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

      <cc-replace-card cardid$="${props.cardid}" owner="${props.owner}"></cc-replace-card>
      <cc-pawn-card cardid$="${props.cardid}"></cc-pawn-card>
    `;
  };
  
  static get properties() { return {
    cardid: String,
    owner: String
  }};
}
window.customElements.define('cc-play-area-card', CcPlayAreaCard);