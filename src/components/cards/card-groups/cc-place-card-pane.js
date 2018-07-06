import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { store } from '../../../store.js';

import { CancelPlaySelectedCard } from '../../../actions/card.js';

import '../../global/cc-btn';

export class CcPlaceCardPane extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .action-selections {
          flex: 0 0 var(--card-hand-height);
          margin-top: 20px;
        }

        .action-selections cc-btn:first-child {
          margin-left: 0;
        }

        .action-selections cc-btn {
          margin-left: 20px;
        }
      </style>

      <cc-play-area hide?="${true}"></cc-play-area>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
      </div>
    `
  }

  _cancel() {
    store.dispatch(CancelPlaySelectedCard())
  }
}

window.customElements.define('cc-place-card-pane', CcPlaceCardPane);
