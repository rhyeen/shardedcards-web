import { LitElement, html } from '@polymer/lit-element';
import {
  CcSharedStyles } from '../../global/cc-shared-styles.js';

class CcAttackCard extends LitElement {
  _render({_showCard}) {
    return html`
      ${CcSharedStyles}

      <style>
        :host {
          --card-padding: 8px;
          --card-border-width: 2px;
          width: calc(var(--pawn-card-width) - 2*var(--card-padding) - 2*var(--card-border-width));
          height: calc(var(--pawn-card-height) - 2*var(--card-padding) - 2*var(--card-border-width));
          border: var(--card-border-width) dashed #e53935;
          border-radius: 8px;
          padding: var(--card-padding);
        }
      </style>

    `;
  };
  
  static get properties() { return {
    card: Object,
    _showCard: Boolean
  }};
}
window.customElements.define('cc-attack-card', CcAttackCard);