import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import '../card-types/cc-full-card';

export class CcFullCardPane extends LitElement {
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
      <cc-full-card cardid="test"></cc-full-card>
      <!-- <cc-full-card cardid="beast"></cc-full-card>
      <cc-full-card cardid="monster"></cc-full-card>
      <cc-full-card cardid="hero"></cc-full-card>
      <cc-full-card cardid="pawn"></cc-full-card> -->
    `
  }
}

window.customElements.define('cc-full-card-pane', CcFullCardPane);
