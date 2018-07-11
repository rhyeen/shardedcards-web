import { 
  RESET_ENERGY,
  SPEND_ALLOCATED_ENERGY,
  ALLOCATE_ENERGY,
  CANCEL_ALLOCATE_ENERGY } from '../actions/status.js';

const defaultState = {
  energy: {
    max: 5,
    current: 4,
    pending: 4
  },
  health: {
    max: 20,
    current: 4,
    pending: 4
  }
}

const app = (state = defaultState, action) => {
  let energyRemaining
  switch (action.type) {
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
      energyRemaining = state.energy.current - action.energyCost
      if (energyRemaining < 0) {
        energyRemaining = 0
      }
      return {
        ...state,
        energy: {
          ...state.energy,
          pending: energyRemaining          
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
    default:
      return state;
  }
}

export default app;
