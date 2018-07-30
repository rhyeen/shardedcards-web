export const RESET_ENERGY = 'RESET_ENERGY';
export const SPEND_ALLOCATED_ENERGY = 'SPEND_ALLOCATED_ENERGY';
export const ALLOCATE_ENERGY = 'ALLOCATE_ENERGY';
export const CANCEL_ALLOCATE_ENERGY = 'CANCEL_ALLOCATE_ENERGY';
export const SET_STATUS = 'SET_STATUS';
export const SET_PLAYER_HEALTH = 'SET_PLAYER_HEALTH';
export const MODIFY_ENERGY = 'MODIFY_ENERGY';

export const resetEnergy = () => {
  return {
    type: RESET_ENERGY
  }
};

export const spendAllocatedEnergy = () => {
  return {
    type: SPEND_ALLOCATED_ENERGY
  }
};

export const allocateEnergy = (energyCost) => {
  return {
    type: ALLOCATE_ENERGY,
    energyCost
  }
};

export const modifyEnergy = (maxEnergyModifier, currentEnergyModifier) => {
  return {
    type: MODIFY_ENERGY,
    maxEnergyModifier,
    currentEnergyModifier
  }
}

export const cancelAllocateEnergy = () => {
  return {
    type: CANCEL_ALLOCATE_ENERGY
  }
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status
  }
};

export const setPlayerHealth = (health) => {
  return {
    type: SET_PLAYER_HEALTH,
    health
  }
}