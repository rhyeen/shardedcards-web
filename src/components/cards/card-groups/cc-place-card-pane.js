import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { store } from '../../../store.js';

import { CancelPlaySelectedHandCard } from '../../../actions/card.js';

import { CancelAllocateEnergy } from '../../../actions/status.js';

import '../../global/cc-btn.js';

export class CcPlaceCardPane extends LitElement {
  _render() {
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
          display: flex;
          justify-content: center;
          flex-direction: column;
          flex: 0 0 calc(var(--card-hand-height));
        }

        .action-selections cc-btn:first-child {
          margin-left: 0;
        }

        .action-selections cc-btn {
          margin-left: 20px;
        }
      </style>

      <cc-play-area overlay?="${true}"></cc-play-area>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
      </div>
    `
  }

  _cancel() {
    store.dispatch(CancelAllocateEnergy())
    store.dispatch(CancelPlaySelectedHandCard())
  }
}

window.customElements.define('cc-place-card-pane', CcPlaceCardPane);
