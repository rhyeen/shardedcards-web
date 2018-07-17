import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor } from '../../global/cc-shared-styles.js';

import '../card-parts/cc-card-static-value.js';
import {
  PART_TYPE_ATTACK,
  PART_TYPE_COST,
  PART_TYPE_HEALTH,
  PART_TYPE_RANGE,
  PART_TYPE_SHIELD } from '../card-parts/cc-card-static-value.js';

import '../card-parts/cc-card-conditions.js';

import {
  OPPONENT_OWNER,
  PLAYER_OWNER } from '../../../data/owner.js';

class CcFullCard extends LitElement {
  _render({card, cardversion}) {
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
        <cc-card-static-value card="${card}" valueType="${PART_TYPE_COST}"></cc-card-static-value>
        <div card-title>${card.title}</div>
      </header>
      <section>
        <cc-card-conditions card="${card}" cardversion$="${cardversion}"></cc-card-conditions>
      </section>
      <footer>
        <div class="footer-left">
          <cc-card-static-value card="${card}" valueType="${PART_TYPE_RANGE}"></cc-card-static-value>
          <cc-card-static-value card="${card}" valueType="${PART_TYPE_ATTACK}"></cc-card-static-value>
        </div>
        <div class="footer-right">
          <cc-card-static-value card="${card}" valueType="${PART_TYPE_HEALTH}"></cc-card-static-value>
          <cc-card-static-value card="${card}" valueType="${PART_TYPE_SHIELD}"></cc-card-static-value>
        </div>
      </footer>
    `;
  };
  
  static get properties() { return {
    card: Object,
    owner: String,
    cardversion: Number
  }};
}
window.customElements.define('cc-full-card', CcFullCard);