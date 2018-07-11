import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import { 
  CancelSelectHandCard,
  PlaySelectedHandCard } from '../../../actions/card.js';

import {
  AllocateEnergy } from '../../../actions/status.js';

import '../card-types/cc-full-card.js';
import '../../global/cc-btn.js';

export class CcHandCardPane extends connect(store)(LitElement) {
  _render({_selectedCard, _cannotAfford}) {
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
        <cc-btn btntype="play" on-click="${() => this._play()}" disabled?="${_cannotAfford}"></cc-btn>
      </div>
    `
  }

  static get properties() { return {
    _selectedCard: Object,
    _cannotAfford: Boolean
  }};

  _cancel() {
    store.dispatch(CancelSelectHandCard())
  }

  _play() {
    store.dispatch(AllocateEnergy(this._selectedCard.cost))
    store.dispatch(PlaySelectedHandCard())
  }

  _stateChanged(state) {
    let cardId = state.card.selectedHandCard.id
    let cardInstance = state.card.selectedHandCard.instance
    if (!cardId) {
      this._selectedCard = {}
      return
    }
    this._selectedCard = state.card.cards[cardId].instances[cardInstance]
    this._cannotAfford = this._selectedCard.cost > state.status.energy.current;
  }
}

window.customElements.define('cc-hand-card-pane', CcHandCardPane);
