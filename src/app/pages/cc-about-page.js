import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

export class CcAboutPage extends CcPageViewElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <h2>About</h2>
    `
  }
}

window.customElements.define('cc-about-page', CcAboutPage);
