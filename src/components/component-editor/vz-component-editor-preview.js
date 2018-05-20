import { LitElement, html } from '@polymer/lit-element';

import '../crafted-component/vz-crafted-component.js';
import { VzSharedStyles } from '../global/vz-shared-styles.js';

class VzComponentEditorPreview extends LitElement {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      ${VzSharedStyles}
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
          box-shadow: var(--vz-elevation-1);
          background-color: var(--base-white);
        }
      </style>
      
      <div class="preview-box">
        <vz-crafted-component></vz-crafted-component>      
      </div>
    `;
  };
  
  static get properties() { return {
  }};

  constructor() {
    super();
  }
}
window.customElements.define('vz-component-editor-preview', VzComponentEditorPreview);