import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

import './cc-card-ability-value.js';

class CcCardAbilities extends LitElement {
  _render({card, cardversion}) {
    if (!card.abilities) {
      card.abilities = []
    }

    let abilitiesHtml = this._getAbilitiesHtml(card, cardversion)

    return html`
      ${CcSharedStyles}

      ${abilitiesHtml}
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number
  }};

  _getAbilitiesHtml(card, cardversion) {
    return html`
    ${card.abilities.map((ability) => this._getAbilityHtml(card, cardversion, ability))}
    `
  }

  _getAbilityHtml(card, cardversion, ability) {
    return html`<cc-card-ability-value card="${card}" cardversion$="${cardversion}" ability="${ability}"></cc-card-ability-value>`
  }
}
window.customElements.define('cc-card-abilities', CcCardAbilities);