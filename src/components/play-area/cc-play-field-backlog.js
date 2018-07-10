import { html, LitElement } from '@polymer/lit-element';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

import '../cards/card-groups/cc-card-backlog';

export class CcPlayFieldBacklog extends LitElement {
  _render({overlay}) {
    return html`
      ${CcSharedStyles}
      <style>
        :host {
          display: flex;
          flex: 0 0 25px;
          width: 100%;
        }

        [overlay] {
          display: none;
        }
      </style>
      <div class="field-pane left" overlay?="${overlay}">
        <cc-card-backlog playareaindex="${0}"></cc-card-backlog>
      </div>
      <div class="field-pane-separator" overlay?="${overlay}"></div>
      <div class="field-pane middle" overlay?="${overlay}">
        <cc-card-backlog playareaindex="${1}"></cc-card-backlog>
      </div>
      <div class="field-pane-separator" overlay?="${overlay}"></div>
      <div class="field-pane right" overlay?="${overlay}">
        <cc-card-backlog playareaindex="${2}"></cc-card-backlog>
      </div>
    `
  }

  static get properties() { return {
    overlay: Boolean
  }};
}

window.customElements.define('cc-play-field-backlog', CcPlayFieldBacklog);
