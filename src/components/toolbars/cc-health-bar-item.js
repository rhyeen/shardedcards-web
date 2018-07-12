import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../store.js';

import { HealthIcon } from '../global/cc-icons.js';

export class CcHealthBarItem extends connect(store)(LitElement) {
  _render({_currentHealth}) {
    return html`
      ${CcSharedStyles}
      
      <div bar-item>
        <div class="current">${_currentHealth}</div>
        <div class="icon">${HealthIcon()}</div>
      </div>
    `
  }

  static get properties() { return {
    _currentHealth: Number,
    _maxHealth: Number
  }};


  _stateChanged(state) {
    this._currentHealth = state.status.health.current
    this._maxHealth = state.status.health.max
  }
}

window.customElements.define('cc-health-bar-item', CcHealthBarItem);
