import { LitElement, html } from '@polymer/lit-element';

import '../crafted-component/vz-crafted-component.js';

class VzComponentEditorPreview extends LitElement {
  _render(props) {
    // Note the use of the object spread to explicitely
    // call out which properties you're using for rendering.

    // Anything code that is related to rendering should be done in here.

    return html`
      <style>
        :host {
          flex-grow: 1;
        }
      </style>

      <div>THIS IS A PREVIEW</div>

      <vz-crafted-component></vz-crafted-component>
    `;
  };
  
  static get properties() { return {
  }};

  constructor() {
    super();
  }
}
window.customElements.define('vz-component-editor-preview', VzComponentEditorPreview);