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
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';
import { navigate, updateOffline, showSnackbar } from '../actions/app.js';
import data from '../reducers/data.js';
import crafted from '../reducers/crafted.js';
import { loadAll } from '../actions/data.js';
import '../components/vz-snack-bar.js';

store.addReducers({data});
store.addReducers({crafted});

class VzApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _snackbarOpened, _offline}) {
    return html`
    <style>
      :host {
        height: 100vh;
      }

      header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        box-sizing: border-box;
        height: 46px;
        background-color: #EFEFEF;
      }

      [main-title] {
        font-size: 30px;
        text-align: left;
      }

      .toolbar-list {
        display: flex;
      }

      .toolbar-list a {
        text-decoration: none;
        line-height: 30px;
        padding: 4px 16px;
        font-size: 14px;
      }

      .toolbar-list a[selected] {
        border-bottom: 4px solid #222;
      }

      .main-content {
        margin-top: 46px;
      }

      .main-content .page[active] {
        display: block;
      }

      .main-content .page {
        display: none;
      }

      /* Small layout */
      @media (max-width: 460px) {
        [main-title] {
          font-size: 26px;
        }
        .toolbar-list a {
          font-size: 12px;
          padding: 2px 4px;
        }
      }
    </style>

    <!-- Header -->
    <header>
      <span main-title>Vizeb</span>
      <nav class="toolbar-list" role="navigation">
        <a selected?="${_page === 'edit'}" href="/edit">Edit</a>
        <a selected?="${_page === 'about'}" href="/about">About</a>
      </nav>
    </header>

    <!-- Main content -->
    <main class="main-content" role="main">
      <vz-edit-page class="page" active?="${_page === 'edit'}"></vz-edit-page>
      <vz-about-page class="page" active?="${_page === 'about'}"></vz-about-page>
      <vz-view404 class="page" active?="${_page === 'view404'}"></vz-view404>
    </main>

    <vz-snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.
    </vz-snack-bar>
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

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
      });
    }
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

window.customElements.define('vz-app', VzApp);
