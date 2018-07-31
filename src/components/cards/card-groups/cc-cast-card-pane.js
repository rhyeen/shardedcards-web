import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

import {
  CancelCastingCard,
  FinishCastingCard,
  CastAbilityEnergize } from '../../../actions/app.js';

import { ABILITY_ENERGIZE } from '../../../util/card-constants.js';  

import '../card-parts/cc-card-ability-selection.js';

import '../../global/cc-btn.js';

export class CcCastCardPane extends connect(store)(LitElement) {
  _render({_selectedCard, _selectedCardVersion}) {
    if (!_selectedCard) {
      _selectedCard = {
        abilities: []
      }
    }

    const abilitiesHtml = this._getAbilitiesHtml()
    const finishActionBtnHtml = this._getFinishActionBtnHtml()

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
        ${finishActionBtnHtml}
      </div>
    `
  }

  static get properties() { return {
    _selectedCard: Object,
    _selectedCardVersion: Number
  }};

  _stateChanged(state) {
    const cardId = state.card.selectedCastingCard.id
    const cardInstance = state.card.selectedCastingCard.instance
    if (!cardId) {
      this._selectedCard = {
        version: 0,
        abilities: []
      }
      return
    }
    this._selectedCard = state.card.cards[cardId].instances[cardInstance]
    this._selectedCardVersion = this._selectedCard.version
  }

  _cancel() {
    store.dispatch(CancelCastingCard())
  }

  _done() {
    store.dispatch(FinishCastingCard())
  }

  _getAbilitiesHtml() {
    return html`${this._selectedCard.abilities.map((ability) => this._getAbilityHtml(ability))}`
  }

  _getAbilityHtml(ability) {
    return html`
      <cc-card-ability-selection
          card="${this._selectedCard}"
          cardversion$="${this._selectedCardVersion}"
          ability="${ability}"
          on-click="${() => this._castAbility(ability)}"></cc-card-ability-selection>
    `
  }

  _getFinishActionBtnHtml() {
    if (this._noAbilitiesUsed()) {
      return html`<cc-btn btntype="cancel" on-click="${() => this._cancel()}"></cc-btn>`
    }
    return html`<cc-btn btntype="done" on-click="${() => this._done()}"></cc-btn>`
  }

  _noAbilitiesUsed() {
    for (let ability of this._selectedCard.abilities) {
      if (ability.used) {
        return false
      }
    }
    return true
  }

  _castAbility(ability) {
    if (!!ability.used) {
      return
    }
    switch (ability.id) {
      case ABILITY_ENERGIZE:
        return store.dispatch(CastAbilityEnergize(ability.id))
      default:
        console.error(`Unexpected ability: ${ability.id}`)
        return
    }
  }
}

window.customElements.define('cc-cast-card-pane', CcCastCardPane);
