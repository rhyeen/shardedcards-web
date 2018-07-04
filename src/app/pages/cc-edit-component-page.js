import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

import '../../components/component-editor/cc-component-editor-pane';
import '../../components/cards/card-types/cc-full-card';


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
        <cc-full-card cardid="test"></cc-full-card>
        <!-- <cc-full-card cardid="beast"></cc-full-card>
        <cc-full-card cardid="monster"></cc-full-card>
        <cc-full-card cardid="hero"></cc-full-card>
        <cc-full-card cardid="pawn"></cc-full-card> -->
      </div>
      <cc-full-card-hand></cc-full-card-hand>
    `
  }
}

window.customElements.define('cc-edit-page', CcEditPage);
