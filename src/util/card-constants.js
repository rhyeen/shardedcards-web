import {
  EnergizeIcon,
  SpellshotIcon,
  HasteIcon,
  ReachIcon } from '../components/global/cc-icons.js';

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

export const PART_TYPE_ABILITY = 'ability';

export const ABILITY_ENERGIZE = 'energize';
export const ABILITY_HASTE = 'haste';
export const ABILITY_SPELLSHOT = 'spellshot';
export const ABILITY_REACH = 'reach';

export const GetAbilityName = (ability) => {
  switch (ability.id) {
    case ABILITY_ENERGIZE:
      return 'energize'
    case ABILITY_HASTE:
      return 'haste'
    case ABILITY_SPELLSHOT:
      return 'spellshot'
    case ABILITY_REACH:
      return 'reach'
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
    case ABILITY_REACH:
      return `+${ability.amount} range`
    default:
      return ''
  }
}

export const GetAbilityIcon = (ability, args) => {
  switch(ability.id) {
    case ABILITY_ENERGIZE:
      return EnergizeIcon(args)
    case ABILITY_HASTE:
      return HasteIcon(args)
    case ABILITY_SPELLSHOT:
      return SpellshotIcon(args)
    case ABILITY_REACH:
      return ReachIcon(args)
    default:
      return ''
  }
}