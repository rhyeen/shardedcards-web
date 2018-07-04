import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import '../card-types/cc-mini-card';

export class CcCardHand extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          margin: 10px;
        }

        cc-mini-card {
          margin-bottom: 4px;
        }

        cc-mini-card:last-child {
          margin-bottom: 0px;
        }
      </style>
      <cc-mini-card cardid="test"></cc-mini-card>
      <cc-mini-card cardid="beast"></cc-mini-card>
      <cc-mini-card cardid="monster"></cc-mini-card>
      <cc-mini-card cardid="hero"></cc-mini-card>
      <cc-mini-card cardid="pawn"></cc-mini-card>
    `
  }
}

window.customElements.define('cc-card-hand', CcCardHand);
