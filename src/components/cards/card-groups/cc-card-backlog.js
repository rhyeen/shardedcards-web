import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

class CcCardBacklog extends LitElement {
  _render({card}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        [card-banner] {
          position: absolute;
          background-color: #ECEFF1;
          width: 60px;
          height: 60px;
          margin-top: -35px;
          transform: rotate(45deg);
          z-index: -1;
        }

        [backlog-amount] {
          margin-top: 3px;
          line-height: 25px;
          color: #90A4AE;
          text-align: center;
        }
      </style>

      <div card-banner></div>
      <div backlog-amount>${Math.floor(Math.random() * 25)}</div>
    `;
  };
  
  static get properties() { return {
    card: Object
  }};
}
window.customElements.define('cc-card-backlog', CcCardBacklog);