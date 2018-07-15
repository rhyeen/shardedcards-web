import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

export class CcOpponentTurnPane extends LitElement {
  _render({_selectedCard}) {
    return html`
      ${CcSharedStyles}
    `
  }

  static get properties() { return {
  }};
}

window.customElements.define('cc-opponent-turn-pane', CcOpponentTurnPane);
