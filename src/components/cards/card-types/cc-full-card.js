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
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: 200px;
          height: 300px;
          background-color: #FFF;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 8px solid #000;
          border-color: var(${CardRarityColor(card.rarity)});
          padding: 16px;
        }

        header {
          display: flex;
          align-items: center;
        }

        [card-title] {
          text-align: center;
        }
      </style>

      <header>
        <cc-card-cost card="${card}"></cc-card-cost>
        <div card-title>${card.title}</div>
      </header>
      <section></section>
      <footer></footer>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-full-card', CcFullCard);