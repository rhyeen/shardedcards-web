import { 
  RESET_ENERGY,
  SPEND_ALLOCATED_ENERGY,
  ALLOCATE_ENERGY,
  CANCEL_ALLOCATE_ENERGY,
  SET_STATUS,
  SET_PLAYER_HEALTH,
  MODIFY_ENERGY } from '../actions/domains/status.js';

const defaultState = {
  energy: {
    max: 0,
    current: 0,
    pending: 0
  },
  health: {
    max: 0,
    current: 0,
    pending: 0
  }
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PLAYER_HEALTH:
      state.health.pending = action.health
      state.health.current = action.health
      return state
    case SET_STATUS:
      return {
        ...state,
        energy: {
          max: action.status.energy.max,
          current: action.status.energy.current,
          pending: action.status.energy.current
        },
        health: {
          max: action.status.health.max,
          current: action.status.health.current,
          pending: action.status.health.current
        }
      }
    case RESET_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          current: state.energy.max,
          pending: state.energy.max
        }
      }
    case SPEND_ALLOCATED_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          current: state.energy.pending,
          pending: state.energy.pending
        }
      }
    case ALLOCATE_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          pending: _setValidEnergy(state.energy.current - action.energyCost)          
        }
      }
    case CANCEL_ALLOCATE_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          pending: state.energy.current          
        }
      }
    case MODIFY_ENERGY:
      
      return {
        ...state,
        energy: {
          ...state.energy,
          pending: _setValidEnergy(state.energy.current + action.currentEnergyModifier),
          current: _setValidEnergy(state.energy.current + action.currentEnergyModifier),
          max: _setValidEnergy(state.energy.max + action.maxEnergyModifier)
        }
      }
    default:
      return state;
  }
}

function _setValidEnergy(energy) {
  if (energy < 0) {
    return 0
  }
  return energy
}

export default app;
