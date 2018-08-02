import {
  EnergizeIcon,
  SpellshotIcon,
  HasteIcon } from '../components/global/cc-icons.js';

export const CARD_RARITY_UNDEFINED = 'undefined';
export const CARD_RARITY_COMMON = 'common';
export const CARD_RARITY_RARE = 'rare';
export const CARD_RARITY_EPIC = 'epic';
export const CARD_RARITY_LEGENDARY = 'legendary';
export const CARD_RARITY_STANDARD = 'standard';

export const ENERGY_SHARD_CARD_ID = 'ENERGY_SHARD';
export const ENERGY_SHARD_CARD_INSTANCE = '0';

export const CARD_TYPE_UNIT = 'unit';
export const CARD_TYPE_INSTANT = 'instant';

export const ABILITY_ENERGIZE = 'energize';
export const ABILITY_HASTE = 'haste';
export const ABILITY_SPELLSHOT = 'spellshot';

export const GetAbilityName = (ability) => {
  switch (ability.id) {
    case ABILITY_ENERGIZE:
      return 'energize'
    case ABILITY_HASTE:
      return 'haste'
    case ABILITY_SPELLSHOT:
      return 'spellshot'
    default:
      return ''
  }
}

export const GetAbilityDescription = (ability) => {
  switch (ability.id) {
    case ABILITY_ENERGIZE:
      return `+${ability.amount} max and current energy.`
    case ABILITY_HASTE:
      return `May attack once summoned.`
    case ABILITY_SPELLSHOT:
      return `Deal ${ability.amount} to enemy unit.`
    default:
      return ''
  }
}

export const GetAbilityIcon = (ability, args) => {
  switch(ability.id) {
    case ABILITY_ENERGIZE:
      return EnergizeIcon(args)
    case ABILITY_HASTE:
      return HasteIcon()
    case ABILITY_SPELLSHOT:
      return SpellshotIcon(args)
    default:
      return ''
  }
}