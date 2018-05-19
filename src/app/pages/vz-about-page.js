import { html } from '@polymer/lit-element';
import { VzPageViewElement } from './vz-page-view-element.js';
import { VzSharedStyles } from '../../components/global/vz-shared-styles.js';

export class VzAboutPage extends VzPageViewElement {
  _render(props) {
    return html`
      ${VzSharedStyles}
      <h2>About</h2>
    `
  }
}

window.customElements.define('vz-about-page', VzAboutPage);
