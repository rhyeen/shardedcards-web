import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor,
  CARD_RARITY_UNDEFINED_COLOR } from '../../global/cc-shared-styles.js';

import '../card-parts/cc-card-attack.js';
import '../card-parts/cc-card-health.js';
import '../card-parts/cc-card-range.js';

class CcPawnCard extends LitElement {
  _render({card}) {
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
        <cc-card-static-value card="${card}" valueType="${'range'}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${card}" valueType="${'attack'}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
        <cc-card-static-value card="${card}" valueType="${'health'}" stack?="${true}" reduced?="${true}"></cc-card-static-value>
      </footer>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-pawn-card', CcPawnCard);