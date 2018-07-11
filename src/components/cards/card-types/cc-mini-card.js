import { LitElement, html } from '@polymer/lit-element';

import {
  CcSharedStyles,
  CardRarityColor,
  CARD_RARITY_UNDEFINED_COLOR } from '../../global/cc-shared-styles.js';

import '../card-parts/cc-card-cost.js';
import '../card-parts/cc-card-range.js';

class CcMiniCard extends LitElement {
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
          --card-border-radius: 16px;
          --card-padding: 16px;
          line-height: var(--mini-card-height);
          display: flex;
          justify-content: space-between;
          align-items: top;
          max-width: calc(var(--mini-card-max-width) - 2*var(--card-padding));
          background-color: var(${CardRarityColor(card.rarity)});
          box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.15);
          border-top-left-radius: var(--card-border-radius);
          border-top-right-radius: var(--card-border-radius);
          padding: 0 var(--card-padding);
        }

        header,
        footer {
          height: var(--mini-card-height);
          display: flex;
          align-items: center;
        }
      </style>

      <header>
        <cc-card-cost card="${card}"></cc-card-cost>
        <div card-title>${card.title}</div>
      </header>
      <footer>
        <cc-card-range card="${card}"></cc-card-range>
      </footer>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-mini-card', CcMiniCard);