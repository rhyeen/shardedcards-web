import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

class CcFullCard extends LitElement {
  _render({card}) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          display: block;
          width: 200px;
          height: 300px;
          background-color: #FFF;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 8px solid #000;
          border-color: var(${CardRarityColor(card.rarity)});
          padding: 16px;
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
window.customElements.define('cc-full-card', CcFullCard);