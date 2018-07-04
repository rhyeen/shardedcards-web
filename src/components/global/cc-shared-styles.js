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

import {
  CARD_RARITY_UNDEFINED,
  CARD_RARITY_COMMON,
  CARD_RARITY_RARE,
  CARD_RARITY_EPIC,
  CARD_RARITY_LEGENDARY } from '../../data/card-rarity.js';

export const CARD_RARITY_UNDEFINED_COLOR = '--card-rarity-undefined-color';
export const CARD_RARITY_COMMON_COLOR = '--card-rarity-common-color';
export const CARD_RARITY_RARE_COLOR = '--card-rarity-rare-color';
export const CARD_RARITY_EPIC_COLOR = '--card-rarity-epic-color';
export const CARD_RARITY_LEGENDARY_COLOR = '--card-rarity-legendary-color';

export const CardRarityColor = function(rarity) {
  switch (rarity) {
    case CARD_RARITY_UNDEFINED:
      return CARD_RARITY_UNDEFINED_COLOR
    case CARD_RARITY_COMMON:
      return CARD_RARITY_COMMON_COLOR
    case CARD_RARITY_RARE:
      return CARD_RARITY_RARE_COLOR
    case CARD_RARITY_EPIC:
      return CARD_RARITY_EPIC_COLOR
    case CARD_RARITY_LEGENDARY:
      return CARD_RARITY_LEGENDARY_COLOR
    default:
      return CARD_RARITY_COMMON_COLOR
  }
}

export const CcSharedStyles = html`
<style>
  :host {
    --card-rarity-undefined-color: #EFEBE9;
    --card-rarity-common-color: #78909C;
    --card-rarity-rare-color: #1976D2;
    --card-rarity-epic-color: #8E24AA;
    --card-rarity-legendary-color: #FFC107;

    --nav-header-height: 46px;
    --near-black: #222426;
    --near-white: #F7FBFF;
    --base-white: #FFF;
    --near-white-border: #E7EBEF;
    --off-black: #525456;
    
    --overlay-black: rgba(0, 0, 0, 0.5);

    --cc-elevation-1: 2px 2px 10px rgba(0, 0, 0, 0.1);
    --cc-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);
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
