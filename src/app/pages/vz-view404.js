import { html } from '@polymer/lit-element';
import { VzPageViewElement } from './vz-page-view-element.js';
import { VzSharedStyles } from '../../components/global/vz-shared-styles.js';

class VzView404 extends VzPageViewElement {
  _render(props) {
    return html`
      ${VzSharedStyles}
      <h2>Oops! You hit a 404!</h2>
      <p>This page is not a thing.
        Head back <a href="/">to safety</a>.
      </p>
    `
  }
}

window.customElements.define('vz-view404', VzView404);
