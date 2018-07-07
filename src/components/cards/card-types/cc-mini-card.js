import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

class CcMiniCard extends LitElement {
  _render({card}) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-border-radius: 16px;
          --card-padding: 16px;
          line-height: var(--mini-card-height);
          display: block;
          max-width: calc(var(--mini-card-max-width) - 2*var(--card-padding));
          height: var(--mini-card-height);
          background-color: var(${CardRarityColor(card.rarity)});
          box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.15);
          border-top-left-radius: var(--card-border-radius);
          border-top-right-radius: var(--card-border-radius);
          padding: 0 var(--card-padding);
        }
      </style>

      <div card-title>${card.title}</div>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-mini-card', CcMiniCard);