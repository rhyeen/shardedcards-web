import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import '../card-parts/cc-card-static-value.js';

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

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: space-between;
        }

        .footer-left,
        .footer-right {
          display: flex;
          align-items: center;
        }

        [card-title] {
          text-align: center;
          margin-left: 10px;
        }

        cc-card-static-value:first-child {
          margin-left: 0px;
        }

        cc-card-static-value {
          margin-left: 10px;
        }
      </style>

      <header>
        <cc-card-static-value card="${card}" valueType="${'cost'}"></cc-card-static-value>
        <div card-title>${card.title}</div>
      </header>
      <section></section>
      <footer>
        <div class="footer-left">
          <cc-card-static-value card="${card}" valueType="${'range'}"></cc-card-static-value>
          <cc-card-static-value card="${card}" valueType="${'attack'}"></cc-card-static-value>
        </div>
        <div class="footer-right">
          <cc-card-static-value card="${card}" valueType="${'health'}"></cc-card-static-value>
        </div>
      </footer>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-full-card', CcFullCard);