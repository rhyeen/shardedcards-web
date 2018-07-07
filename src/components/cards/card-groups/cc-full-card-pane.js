import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../../store.js';

import { 
  CancelSelectCard,
  PlaySelectedCard } from '../../../actions/card.js';

import '../card-types/cc-full-card';
import '../../global/cc-btn';

export class CcFullCardPane extends connect(store)(LitElement) {
  _render({_selectedCard}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .action-selections {
          margin: 20px 0 40px 0;
        }

        .action-selections cc-btn:first-child {
          margin-left: 0;
        }

        .action-selections cc-btn {
          margin-left: 20px;
        }
      </style>
      <cc-full-card card="${_selectedCard}"></cc-full-card>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
        <cc-btn btntype="confirm" on-click="${() => this._confirm()}"></cc-btn>
      </div>
    `
  }

  static get properties() { return {
    _selectedCard: Object
  }};

  _cancel() {
    store.dispatch(CancelSelectCard())
  }

  _confirm() {
    store.dispatch(PlaySelectedCard())
  }

  _stateChanged(state) {
    let cardid = state.card.selectedCard.id
    if (!cardid) {
      this._selectedCard = {}
      return
    }
    this._selectedCard = state.card.cards[cardid]
  }
}

window.customElements.define('cc-full-card-pane', CcFullCardPane);
