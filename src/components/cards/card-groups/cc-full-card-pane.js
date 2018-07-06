import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { store } from '../../../store.js';

import { 
  CancelSelectCard,
  PlaySelectedCard } from '../../../actions/card.js';

import '../card-types/cc-full-card';
import '../../global/cc-btn';

export class CcFullCardPane extends LitElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
        }

        .action-selections {
          margin-top: 20px;
        }

        .action-selections cc-btn:first-child {
          margin-left: 0;
        }

        .action-selections cc-btn {
          margin-left: 20px;
        }
      </style>
      <cc-full-card></cc-full-card>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
        <cc-btn btntype="confirm" on-click="${() => this._confirm()}"></cc-btn>
      </div>
    `
  }

  _cancel() {
    store.dispatch(CancelSelectCard())
  }

  _confirm() {
    store.dispatch(PlaySelectedCard())
  }
}

window.customElements.define('cc-full-card-pane', CcFullCardPane);
