import { LitElement, html } from '@polymer/lit-element';
import { CcSharedStyles } from '../../global/cc-shared-styles.js';

import { connect } from 'pwa-helpers/connect-mixin';
import { store } from '../../../store.js';

class CcCardBacklog extends connect(store)(LitElement) {
  _render({_backlogNumber}) {
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
      <div backlog-amount>${_backlogNumber}</div>
    `;
  };
  
  static get properties() { return {
    playareaindex: Number,
    _backlogNumber: Number
  }};

  _stateChanged(state) {
    this._backlogNumber = state.card.opponentFieldBacklog[this.playareaindex]
  }
}
window.customElements.define('cc-card-backlog', CcCardBacklog);