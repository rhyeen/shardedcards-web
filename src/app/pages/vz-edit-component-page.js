import { html } from '@polymer/lit-element';
import { VzPageViewElement } from './vz-page-view-element.js';
import { VzSharedStyles } from '../../components/global/vz-shared-styles.js';

import '../../components/component-editor/vz-component-editor-pane.js';
import '../../components/component-editor/vz-component-editor-preview.js';


export class VzEditPage extends VzPageViewElement {
  _render(props) {
    return html`
      ${VzSharedStyles}
      <style>
        :host {
          display: flex;
          height: 100vh;
        }
      </style>
      <h2>Edit</h2>

      <vz-component-editor-preview></vz-component-editor-preview>      
      <vz-component-editor-pane></vz-component-editor-pane>
    `
  }
}

window.customElements.define('vz-edit-page', VzEditPage);
