import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles,
  CardRarityColor,
  CARD_RARITY_UNDEFINED_COLOR } from '../../global/cc-shared-styles.js';

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
          --card-padding: 8px;
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

        [card-title] {
          text-align: center;
        }
      </style>

      <header>
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
window.customElements.define('cc-pawn-card', CcPawnCard);