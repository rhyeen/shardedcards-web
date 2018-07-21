export const RESET_ENERGY = 'RESET_ENERGY';
export const SPEND_ALLOCATED_ENERGY = 'SPEND_ALLOCATED_ENERGY';
export const ALLOCATE_ENERGY = 'ALLOCATE_ENERGY';
export const CANCEL_ALLOCATE_ENERGY = 'CANCEL_ALLOCATE_ENERGY';
export const SET_STATUS = 'SET_STATUS';
export const SET_PLAYER_HEALTH = 'SET_PLAYER_HEALTH';

export const ResetEnergy = () => {
  return {
    type: RESET_ENERGY
  }
};

export const SpendAllocatedEnergy = (energyCost) => {
  return {
    type: SPEND_ALLOCATED_ENERGY,
    energyCost
  }
};

export const AllocateEnergy = (energyCost) => {
  return {
    type: ALLOCATE_ENERGY,
    energyCost
  }
};

export const CancelAllocateEnergy = () => {
  return {
    type: CANCEL_ALLOCATE_ENERGY
  }
};

export const SetStatus = (status) => {
  return {
    type: SET_STATUS,
    status
  }
};

export const SetPlayerHealth = (health) => {
  return {
    type: SET_PLAYER_HEALTH,
    health
  }
}