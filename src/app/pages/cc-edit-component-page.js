import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import '../../components/component-editor/cc-component-editor-pane';
import '../../components/playing-card/cc-playing-card';


export class CcEditPage extends CcPageViewElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
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
        <cc-playing-card cardid="test"></cc-playing-card>
        <cc-playing-card cardid="beast"></cc-playing-card>
        <cc-playing-card cardid="monster"></cc-playing-card>
        <cc-playing-card cardid="hero"></cc-playing-card>
        <cc-playing-card cardid="pawn"></cc-playing-card>
      </div>
    `
  }
}

window.customElements.define('cc-edit-page', CcEditPage);
