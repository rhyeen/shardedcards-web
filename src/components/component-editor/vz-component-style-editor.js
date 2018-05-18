import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class VzComponentStyleEditor extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
            width: 400px;
            background-color: white;
            align-self: stretch;
        }
      </style>

      <div>THIS IS A EDITOR</div>

      <paper-input
          label="Style"
          value="{{craftedStyle}}"></paper-input>
      <div>[[craftedStyle]]</div>
    `;
  }

  static get properties() {
    return {
      craftedStyle: {
        type: String,
        reflectToAttribute: true,
        notify: true,
        value: "background-color: yellow;"
      }
    };
  }
}

window.customElements.define('vz-component-style-editor', VzComponentStyleEditor);
