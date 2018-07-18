import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import {
  GetAttackingCardResults,
  GetAttackedCardResults } from '../../../util/card.js';

import {
  DeadIcon,
  HealthIcon } from '../../global/cc-icons.js';

class CcAttackCard extends LitElement {
  _render({attacking, attacked}) {
    const attackedResultHtml = this._getAttackedResultHtml(attacking, attacked)
    const attackingResultHtml = this._getAttackingResultHtml(attacking, attacked)

    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          --card-border-width: 2px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding) - 2*var(--card-border-width));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding) - 2*var(--card-border-width));
          border: var(--card-border-width) dashed #e53935;
          border-radius: 8px;
          padding: var(--card-padding);
          background-color: var(--overlay-card-white);
          display: flex;
          flex-direction: column;
        }
      </style>

      <div class="overlay-card-top">
        ${attackedResultHtml}
      </div>
      <div class="overlay-card-separator"></div>
      <div class="overlay-card-bottom">
        ${attackingResultHtml}
      </div>
    `;
  };
  
  static get properties() { return {
    attacking: Object,
    attacked: Object
  }};
  
  _getAttackingResultHtml(attacking, attacked) {
    const _attacking = GetAttackingCardResults(attacking, attacked)
    return this._getHealthResultHtml(_attacking.health - attacking.health, _attacking.health)
  }

  _getAttackedResultHtml(attacking, attacked) {
    const _attacked = GetAttackedCardResults(attacking, attacked)
    return  this._getHealthResultHtml(_attacked.health - attacked.health, _attacked.health)
  }

  _getHealthResultHtml(lostHealth, remainingHealth) {
    if (remainingHealth <= 0) {
      return html`${DeadIcon()}`
    }
    return html`${lostHealth} ${HealthIcon()}`
  }
}
window.customElements.define('cc-attack-card', CcAttackCard);