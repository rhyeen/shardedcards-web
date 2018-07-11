import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { EnergyIcon } from '../global/cc-icons';

export class CcEnergyBarItem extends connect(store)(LitElement) {
  _render({_currentEnergy, _maxEnergy}) {
    return html`
      ${CcSharedStyles}

      <div bar-item>
        <div class="current">${_currentEnergy}</div>
        <div class="current-max-divider">/</div>
        <div class="max">${_maxEnergy}</div>
        <div class="icon">${EnergyIcon()}</div>
      </div>
    `
  }

  static get properties() { return {
    _currentEnergy: Number,
    _maxEnergy: Number
  }};


  _stateChanged(state) {
    this._currentEnergy = state.status.energy.pending
    this._maxEnergy = state.status.energy.max
  }
}

window.customElements.define('cc-energy-bar-item', CcEnergyBarItem);
