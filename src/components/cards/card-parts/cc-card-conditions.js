import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import './cc-card-condition-value.js';
import { CONDITION_TYPE_EXHAUSTED } from './cc-card-condition-value.js';

class CcCardConditions extends LitElement {
  _render({card, cardversion}) {
    if (!card.conditions) {
      card.conditions = {}
    }

    let conditionsHtml = this._getConditionsHtml(card, cardversion)

    return html`
      ${CcSharedStyles}

      ${conditionsHtml}
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number
  }};

  _getConditionsHtml(card, cardversion) {
    return html`
    ${this._getExhaustedHtml(card, cardversion)}
    `
  }

  _getExhaustedHtml(card, cardversion) {
    if (!card.conditions.exhausted) {
      return html``
    }
    return html`<cc-card-condition-value card="${card}" cardversion$="${cardversion}" valueType="${CONDITION_TYPE_EXHAUSTED}"></cc-card-condition-value>`
  }
}
window.customElements.define('cc-card-conditions', CcCardConditions);