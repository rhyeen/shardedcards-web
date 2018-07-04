import { LitElement, html } from '@polymer/lit-element';

import '../crafted-component/cc-crafted-component';
import { CcSharedStyles } from '../global/cc-shared-styles.js';

class CcComponentEditorPreview extends LitElement {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      ${CcSharedStyles}
      <style>
        :host {
          flex-grow: 1;
          align-self: stretch;
          background-color: var(--near-white);         
        }

        .preview-box {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px;
          overflow: hidden;
          min-height: 400px;
          border-radius: 3px;
          box-shadow: var(--cc-elevation-1);
          background-color: var(--base-white);
        }
      </style>
      
      <div class="preview-box">
        <cc-crafted-component></cc-crafted-component>      
      </div>
    `;
  };
  
  static get properties() { return {
  }};

  constructor() {
    super();
  }
}
window.customElements.define('cc-component-editor-preview', CcComponentEditorPreview);