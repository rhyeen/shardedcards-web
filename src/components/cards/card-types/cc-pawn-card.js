import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

class CcPawnCard extends LitElement {
  _render({card}) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding));
          box-shadow: var(--cc-elevation-1);
          border-radius: 8px;
          background-color: var(${CardRarityColor(card.rarity)});
          padding: var(--card-padding);
        }

        [card-title] {
          text-align: center;
        }
      </style>

      <div card-title>${card.title}</div>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-pawn-card', CcPawnCard);