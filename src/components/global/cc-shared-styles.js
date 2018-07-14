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
    --card-rarity-common-color: #B0BEC5;
    --card-rarity-rare-color: #64B5F6;
    --card-rarity-epic-color: #BA68C8;
    --card-rarity-legendary-color: #FFD54F;

    --nav-header-height: 46px;
    --nav-footer-height: 46px;
    --near-black: #222426;
    --near-white: #F7FBFF;
    --base-white: #FFF;
    --near-white-border: #E7EBEF;
    --off-black: #525456;
    
    --overlay-black: rgba(0, 0, 0, 0.5);
    --overlay-white: rgba(255, 255, 255, 0.8);
    --overlay-card-white: rgba(255, 255, 255, 0.5); 

    --cc-elevation-1: 1px 1px 5px rgba(0, 0, 0, 0.4);
    --cc-elevation-n1: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --cc-elevation-h1:
      1px 1px 5px rgba(0, 0, 0, 0.4),
      inset 0px 0px 80px rgba(0, 0, 0, 0.1);
    --cc-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);

    --pawn-card-height: 130px;
    --pawn-card-width: 90px;

    --mini-card-height: 32px;
    --mini-card-max-width: 350px;
    --last-mini-card-extra-height: 4px;
    --card-hand-height: calc(5*var(--mini-card-height) + var(--last-mini-card-extra-height));
  }

  button:focus {
    outline: 0;
  }

  a:link, a:visited {
    text-decoration: none;
  }

  .field-pane {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .field-pane-separator {
    flex: 0 0 2px;
    height: 100%;
    background-color: #EEEEEE;
  }

  .field-pane-separator[overlay] {
    background: none;
  }

  [bar-items] {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    height: var(--nav-header-height);
    background-color: var(--base-white);
    align-items: center;
  }

  [bar-items] .item-group {
    display: flex;
    align-items: center;
  }

  [bar-item] {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .svg-icon {
    --default-svg-color: #212121;
    width: 24px;
    height: 24px;
    fill: var(--default-svg-color);
  }

  .energy-svg-icon {
    fill: #42A5F5;
  }

  .health-svg-icon {
    fill: #D81B60;
  }

  .overlay-card-separator {
    flex: 0, 0, 1px;
    border-bottom: 2px dashed #8D6E63;
    width: 100%;
  }

  .overlay-card-top,
  .overlay-card-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
`;
