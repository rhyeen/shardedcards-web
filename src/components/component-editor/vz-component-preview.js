import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class VzComponentPreview extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
            flex-grow: 1;
        }
      </style>

      <div style$="[[craftedStyle]]">[[craftedStyle]]</div>
    `;
  }

  static get properties() {
    return {
      craftedStyle: {
        type: String,
        reflectToAttribute: true,
        value: "background-color: red;"
      }
    };
  }
}

window.customElements.define('vz-component-preview', VzComponentPreview);
