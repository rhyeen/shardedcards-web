import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor,
  CARD_RARITY_UNDEFINED_COLOR } from '../../global/cc-shared-styles.js';

import '../card-parts/cc-card-static-value.js';
import {
  PART_TYPE_ATTACK,
  PART_TYPE_HEALTH,
  PART_TYPE_RANGE,
  PART_TYPE_SHIELD } from '../card-parts/cc-card-static-value.js';


class CcPawnCard extends LitElement {
  _render({card, cardversion}) {
    // @NOTE: `card === undefined` should never be reached, but it is when you add this mini-card to
    // the hand.  There is a double render happening: first time is bad (card = undefined)
    // the second pass works, however.
    if (!card) {
      card = {
        rarity: CARD_RARITY_UNDEFINED_COLOR,
        title: ''
      }
    }

    return html`
      ${CcSharedStyles}

      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          --card-padding: 4px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding));
          box-shadow: var(--cc-elevation-1);
          border-radius: 8px;
          background-color: var(${CardRarityColor(card.rarity)});
          padding: var(--card-padding);
          opacity: ${this._getOpacity(card)};
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: center;
        }

        [card-title] {
          text-align: center;
        }

        cc-card-static-value:first-child {
          margin-left: 0px;
        }

        cc-card-static-value {
          margin-left: 5px;
        }
      </style>

      <header>
        <div card-title>${card.title}</div>
      </header>
      <footer>
        <cc-card-static-value card="${card}" cardversion$="${cardversion}" valueType="${PART_TYPE_RANGE}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${card}" cardversion$="${cardversion}" valueType="${PART_TYPE_ATTACK}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${card}" cardversion$="${cardversion}" valueType="${PART_TYPE_HEALTH}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${card}" cardversion$="${cardversion}" valueType="${PART_TYPE_SHIELD}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
      </footer>
    `;
  };
  
  static get properties() { return {
    card: Object,
    cardversion: Number
  }};
  
  _getOpacity(card) {
    if (!card || !card.conditions) {
      return '1';
    }
    return card.conditions.exhausted ? '0.5' : '1';
  }
}
window.customElements.define('cc-pawn-card', CcPawnCard);