/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { installRouter } from 'pwa-helpers/router';
import { installOfflineWatcher } from 'pwa-helpers/network';

import { store } from '../store.js';
import { navigate, updateOffline, showSnackbar } from '../actions/app.js';
import { loadAll } from '../actions/data.js';

import '../components/cc-snack-bar.js';
import { CcSharedStyles } from '../components/global/cc-shared-styles.js';

import data from '../reducers/data.js';
import crafted from '../reducers/crafted.js';
import card from '../reducers/card.js';
import status from '../reducers/status.js';
store.addReducers({data});
store.addReducers({crafted});
store.addReducers({card});
store.addReducers({status});

class CcApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _snackbarOpened, _offline}) {
    return html`
    ${CcSharedStyles}
    
    <style>
      :host {
        height: 100vh;
        width: 100vw;
      }

      .main-content .page[active] {
        display: block;
      }

      .main-content .page {
        display: none;
      }
    </style>

    <main class="main-content" role="main">
      <cc-game-page class="page" active?="${_page === 'game'}"></cc-game-page>
      <cc-edit-page class="page" active?="${_page === 'edit'}"></cc-edit-page>
      <cc-about-page class="page" active?="${_page === 'about'}"></cc-about-page>
      <cc-view404 class="page" active?="${_page === 'view404'}"></cc-view404>
    </main>

    <cc-snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.
    </cc-snack-bar>
`;
  }
  static get properties() {
    return {
      _page: String,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  _firstRendered() {
    installRouter((location) => this._locationChanged(location));
    installOfflineWatcher((offline) => this._offlineChanged(offline));
    store.dispatch(loadAll());
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
  }

  _offlineChanged(offline) {
    // Don't show the snackbar on the first load of the page.
    if (this._offline === undefined || this._offline == offline) {
      return;
    }
    store.dispatch(updateOffline(offline));
    store.dispatch(showSnackbar());
  }

  _locationChanged(location) {
    store.dispatch(navigate(window.decodeURIComponent(location.pathname)));
  }
}

window.customElements.define('cc-app', CcApp);
