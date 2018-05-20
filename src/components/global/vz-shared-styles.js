/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';

export const VzSharedStyles = html`
<style>
  :host {
    --nav-header-height: 46px;
    --near-black: #222426;
    --near-white: #F7FBFF;
    --base-white: #FFF;
    --near-white-border: #E7EBEF;
    --off-black: #525456;
    --vz-elevation-1: 2px 2px 10px rgba(0, 0, 0, 0.1);
    --vz-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);
  }

  a:link, a:visited {
    text-decoration: none;
  }

  .test {
    background-color: red;
    color: yellow;
    width: 300px;
  }

  .test2 {
    background-color: blue;
    height: 400px;
  }
</style>
`;
