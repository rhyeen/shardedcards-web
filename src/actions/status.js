export const RESET_ENERGY = 'RESET_ENERGY';
export const SPEND_ENERGY = 'SPEND_ENERGY';

export const ResetEnergy = () => {
  return {
    type: RESET_ENERGY
  }
};

export const SpendEnergy = (energyCost) => {
  return {
    type: SPEND_ENERGY,
    energyCost
  }
};
