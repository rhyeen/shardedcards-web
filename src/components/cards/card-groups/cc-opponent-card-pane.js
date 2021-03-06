import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import { 
  CancelSelectOpponentFieldCard } from '../../../actions/app.js';

import { OPPONENT_OWNER } from '../../../util/owner.js';

import '../card-types/cc-full-card.js';
import '../../global/cc-btn.js';

export class CcOpponentCardPane extends connect(store)(LitElement) {
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
      <cc-full-card
          card="${_selectedCard}"
          cardversion$="${_selectedCard.version}"
          owner="${OPPONENT_OWNER}"></cc-full-card>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
      </div>
    `
  }

  static get properties() { return {
    _selectedCard: Object
  }};

  _cancel() {
    store.dispatch(CancelSelectOpponentFieldCard())
  }

  _stateChanged(state) {
    let cardid = state.card.selectedOpponentFieldCard.id
    let cardInstance = state.card.selectedOpponentFieldCard.instance
    if (!cardid) {
      this._selectedCard = {}
      return
    }
    this._selectedCard = state.card.opponentCards[cardid].instances[cardInstance]
  }
}

window.customElements.define('cc-opponent-card-pane', CcOpponentCardPane);
