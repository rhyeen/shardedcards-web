import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import {
  GetReplacingCardResults } from '../../../reducers/card.js';

import {
  DeadIcon,
  ShieldIcon } from '../../global/cc-icons.js';


class CcReplaceCard extends LitElement {
  _render({replacing, replaced}) {
    const replacedResultHtml = this._getReplacedResultHtml()
    const replacingResultHtml = this._getReplacingResultHtml(replacing, replaced)

    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          --card-border-width: 2px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding) - 2*var(--card-border-width));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding) - 2*var(--card-border-width));
          border: var(--card-border-width) dashed #8D6E63;
          border-radius: 8px;
          padding: var(--card-padding);
          background-color: var(--overlay-card-white);
          display: flex;
          flex-direction: column;
        }
      </style>
      
      <div class="overlay-card-top">
        ${replacedResultHtml}
      </div>
      <div class="overlay-card-separator"></div>
      <div class="overlay-card-bottom">
        ${replacingResultHtml}
      </div>
    `;
  };
  
  static get properties() { return {
    replacing: Object,
    replaced: Object
  }};

  _getReplacingResultHtml(replacing, replaced) {
    const _replacing = GetReplacingCardResults(replacing, replaced)
    let currentShield = 0
    if (replacing.conditions.shield) {
      currentShield = replacing.conditions.shield 
    }
    let newShield = 0
    if (_replacing.conditions.shield) {
      newShield = _replacing.conditions.shield
    }
    return this._getArmorResultHtml(newShield - currentShield)
  }

  _getReplacedResultHtml() {
    return html`${DeadIcon()}`
  }

  _getArmorResultHtml(gainedShield) {
    if (gainedShield <= 0) {
      return html``;
    }
    return html`+${gainedShield} ${ShieldIcon()}`
  }
}
window.customElements.define('cc-replace-card', CcReplaceCard);