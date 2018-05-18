import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '../../components/component-editor/vz-component-preview.js';
import '../../components/component-editor/vz-component-style-editor.js';

class VzViewComponentEditor extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: flex;
          height: 100%;
        }
      </style>

      <vz-component-preview crafted-style="[[craftedStyle]]"></vz-component-preview>
      <vz-component-style-editor crafted-style="{{craftedStyle}}"></vz-component-style-editor>
    `;
  }
}

window.customElements.define('vz-view-component-editor', VzViewComponentEditor);
