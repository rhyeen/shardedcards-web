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
        .component-editor-view {
          display: flex;
          align-self: stretch;          
          width: 100vw;
          height: calc(100vh - var(--nav-header-height));          
          margin-top: var(--nav-header-height);          
        }
      </style>
      <div class="component-editor-view">
        <vz-component-editor-preview></vz-component-editor-preview>      
        <vz-component-editor-pane></vz-component-editor-pane>
      </div>
    `
  }
}

window.customElements.define('vz-edit-page', VzEditPage);
