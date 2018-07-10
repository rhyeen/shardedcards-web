import { 
  RESET_MAX_ENERGY,
  SPEND_ENERGY
   } from '../actions/status.js';

const defaultState = {
  energy: {
    max: 5,
    current: 4
  },
  health: {
    max: 20,
    current: 4
  }
}

const app = (state = defaultState, action) => {
  switch (action.type) {
    case RESET_MAX_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          current: state.energy.max
        }
      }
    case SPEND_ENERGY:
      let energyRemaining = state.energy.current - action.energyCost
      if (energyRemaining < 0) {
        console.error(`energy dropped below 0 to ${energyRemaining}`)
        energyRemaining = 0
      }
      return {
        ...state,
        energy: {
          ...state.energy,
          current: state.energy.current - state.energy.spend
        }
      }
    default:
      return state;
  }
}

export default app;
