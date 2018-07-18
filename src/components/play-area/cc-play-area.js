import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../util/owner.js';

import './cc-play-field.js';
import './cc-play-field-backlog.js';

export class CcPlayArea extends LitElement {
  _render({overlay}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }

        .play-field-separator {
          --separator-height: 8px;
          --separator-border-width: 2px;
          width: 100%;
          border-bottom: var(--separator-border-width) solid #EEEEEE;
          border-top: var(--separator-border-width) solid #EEEEEE;
          flex: 0 0 calc(var(--separator-height) - 2*var(--separator-border-width));
        }

        .play-field-separator[overlay] {
          border: none;
          flex: 0 0 var(--separator-height);
        }

        cc-play-field {
          height: 100%;
          width: 100%;
        }
      </style>
      <cc-play-field-backlog overlay?="${overlay}"></cc-play-field-backlog>
      <cc-play-field owner$="${OPPONENT_OWNER}" overlay?="${overlay}"></cc-play-field>
      <div class="play-field-separator" overlay?="${overlay}"></div>
      <cc-play-field owner$="${PLAYER_OWNER}" overlay?="${overlay}"></cc-play-field>
    `
  }

  static get properties() { return {
    overlay: Boolean
  }};
}

window.customElements.define('cc-play-area', CcPlayArea);
