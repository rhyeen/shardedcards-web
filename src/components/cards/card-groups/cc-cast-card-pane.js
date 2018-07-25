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

    let abilitiesHtml = this._getAbilitiesHtml()

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
    _cannotAfford: Boolean,
    _cardId: String,
    _cardInstance: String
  }};

  _stateChanged(state) {
    this._cardId = state.card.selectedCastingCard.id
    this._cardInstance = state.card.selectedCastingCard.instance
    if (!this._cardId) {
      this._selectedCard = {
        version: 0,
        abilities: []
      }
      return
    }
    this._selectedCard = state.card.cards[this._cardId].instances[this._cardInstance]
  }

  _cancel() {
    store.dispatch(CancelAllocateEnergy())
    store.dispatch(CancelCastingCard())
  }

  _done() {
    store.dispatch(FinishCastingCard())
    store.dispatch(SpendAllocatedEnergy())
  }

  _getAbilitiesHtml() {
    return html`${this._selectedCard.abilities.map((ability) => this._getAbilityHtml(ability))}`
  }

  _getAbilityHtml(ability) {
    return html`
      <cc-card-ability-selection
          card="${this._selectedCard}"
          cardversion$="${this._selectedCard.version}"
          ability="${ability}"
          on-click="${() => this._castAbility(ability)}"></cc-card-ability-selection>
    `
  }

  _castAbility(ability) {
    console.log(ability.id)
    console.log(this._cardId)
    console.log(this._cardInstance)
  }
}

window.customElements.define('cc-cast-card-pane', CcCastCardPane);
