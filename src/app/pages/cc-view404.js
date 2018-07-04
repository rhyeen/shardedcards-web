import { html } from '@polymer/lit-element';
import { CcPageViewElement } from './cc-page-view-element.js';
import { CcSharedStyles } from '../../components/global/cc-shared-styles.js';

class CcView404 extends CcPageViewElement {
  _render(props) {
    return html`
      ${CcSharedStyles}
      <h2>Oops! You hit a 404!</h2>
      <p>This page is not a thing.
        Head back <a href="/">to safety</a>.
      </p>
    `
  }
}

window.customElements.define('cc-view404', CcView404);
