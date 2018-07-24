import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import {
  CancelCastingCard,
  FinishCastingCard } from '../../../actions/card.js';

import { 
  CancelAllocateEnergy,
  SpendAllocatedEnergy } from '../../../actions/status.js';

import '../card-parts/cc-card-ability-selection.js';

import '../../global/cc-btn.js';

export class CcCastCardPane extends connect(store)(LitElement) {
  _render({_selectedCard}) {
    if (!_selectedCard) {
      _selectedCard = {
        version: 0,
        abilities: []
      }
    }

    let abilitiesHtml = this._getAbilitiesHtml(_selectedCard, _selectedCard.version)

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
        .ability-selections {
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          align-items: center;
          height: 100%;
          width: 240px;
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

      <div class="ability-selections">
        ${abilitiesHtml}
      </div>
      <div class="action-selections">
        <cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>
        <cc-btn btntype="done" on-click="${() => this._done()}"></cc-btn>
      </div>
    `
  }

  static get properties() { return {
    _selectedCard: Object,
    _cannotAfford: Boolean
  }};

  _stateChanged(state) {
    let cardId = state.card.selectedCastingCard.id
    let cardInstance = state.card.selectedCastingCard.instance
    if (!cardId) {
      this._selectedCard = {
        version: 0,
        abilities: []
      }
      return
    }
    this._selectedCard = state.card.cards[cardId].instances[cardInstance]
  }

  _cancel() {
    store.dispatch(CancelAllocateEnergy())
    store.dispatch(CancelCastingCard())
  }

  _done() {
    store.dispatch(FinishCastingCard())
    store.dispatch(SpendAllocatedEnergy())
  }

  _getAbilitiesHtml(card, cardversion) {
    return html`
    ${card.abilities.map((ability) => this._getAbilityHtml(card, cardversion, ability))}
    `
  }

  _getAbilityHtml(card, cardversion, ability) {
    return html`<cc-card-ability-selection card="${card}" cardversion$="${cardversion}" ability="${ability}"></cc-card-ability-selection>`
  }
}

window.customElements.define('cc-cast-card-pane', CcCastCardPane);
