/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, svg } from '@polymer/lit-element';

export function MenuIcon(customClass) { return getBaseSvg(customClass, 'menu-svg-icon', svg`<path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/>`) }
export function EnergyIcon(customClass) { return getBaseSvg(customClass, 'energy-svg-icon', svg`<path d="M19 12l-7 10-7-10 7-10"/>`) }
export function HealthIcon(customClass) { return getBaseSvg(customClass, 'health-svg-icon', svg`<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/>`) }
export function AttackIcon(customClass) { return getBaseSvg(customClass, 'attack-svg-icon', svg`<path d="M6.92 5H5l9 9 1-.94m4.96 6.06l-.84.84c-.39.39-1.02.39-1.41 0l-3.12-3.12-2.68 2.66-1.41-1.41 1.42-1.42L3 7.75V3h4.75l8.92 8.92 1.42-1.42 1.41 1.41-2.67 2.67 3.12 3.12c.4.4.4 1.03.01 1.42z"/>`) }
export function ShieldIcon(customClass) { return getBaseSvg(customClass, 'shield-svg-icon', svg`<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>`) }
export function EmptyPotionIcon(customClass) { return getBaseSvg(customClass, 'empty-potion-svg-icon', svg`<path d="M5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1c0-.21-.07-.41-.18-.57L13 8.35V4h-2v4.35L5.18 18.43c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1-3-3c0-.6.18-1.16.5-1.63L9 7.81V6a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1-3 3H6z"/>`) }
export function PotionIcon(customClass) { return getBaseSvg(customClass, 'potion-svg-icon', svg`<path d="M5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1c0-.21-.07-.41-.18-.57L13 8.35V4h-2v4.35L5.18 18.43c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1-3-3c0-.6.18-1.16.5-1.63L9 7.81V6a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1-3 3H6m7-6l1.34-1.34L16.27 18H7.73l2.66-4.61L13 16m-.5-4a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5z"/>`) }
export function DrawIcon(customClass) { return getBaseSvg(customClass, 'draw-svg-icon', svg`<path d="M21.47 4.35l-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20c.31.77 1.04 1.24 1.81 1.26.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79.01-.26-.04-.55-.13-.81L13 3.5c-.29-.77-1.03-1.24-1.81-1.25-.26 0-.52.06-.77.15L3.06 5.45c-1.02.42-1.51 1.59-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34"/>`) }
export function DiscardIcon(customClass) { return getBaseSvg(customClass, 'discard-svg-icon', svg`<path d="M5 2h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m1 2v8h12V4H6m14 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16v1m0 4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h16v1z"/>`) }
export function LostCardsIcon(customClass) { return getBaseSvg(customClass, 'lost-cards-svg-icon', svg`<path d="M12 2a9 9 0 0 0-9 9c0 3.03 1.53 5.82 4 7.47V22h2v-3h2v3h2v-3h2v3h2v-3.54c2.47-1.65 4-4.46 4-7.46a9 9 0 0 0-9-9m-4 9a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m8 0a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m-4 3l1.5 3h-3l1.5-3z"/>`) }
export function TargetIcon(customClass) { return getBaseSvg(customClass, 'target-svg-icon', svg`<path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8m0 2a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6m0 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>`) }
export function ExhaustedIcon(customClass) { return getBaseSvg(customClass, 'exhausted-svg-icon', svg`<path d="M23 12h-6v-2l3.39-4H17V4h6v2l-3.38 4H23v2m-8 4H9v-2l3.39-4H9V8h6v2l-3.38 4H15v2m-8 4H1v-2l3.39-4H1v-2h6v2l-3.38 4H7v2z"/>`) }

function getBaseSvg(customClass, definedClass, svgContent) {
  const classes = ['svg-icon', definedClass, customClass].join(' ');
  return html`<svg class$="${classes}" viewBox="0 0 24 24">${svgContent}</svg>`
}