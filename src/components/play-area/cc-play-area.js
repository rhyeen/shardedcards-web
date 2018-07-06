import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import {
  PLAYER_OWNER,
  OPPONENT_OWNER } from '../../data/owner';

import './cc-play-field';

export class CcPlayArea extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }

        .play-field-separator {
          border-bottom: 2px solid #EEEEEE;
          border-top: 2px solid #EEEEEE;
          flex: 0 0 4px;
        }

        cc-play-field {
          height: 100%;
        }
      </style>
      <cc-play-field owner="${OPPONENT_OWNER}"></cc-play-field>
      <div class="play-field-separator"></div>
      <cc-play-field owner="${PLAYER_OWNER}"></cc-play-field>
    `
  }
}

window.customElements.define('cc-play-area', CcPlayArea);
