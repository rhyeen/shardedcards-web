export const ModifyEnergy = (status, maxEnergyModifier, currentEnergyModifier) => {
  status.energy.max = SetValidEnergy(status.energy.max + maxEnergyModifier)
  status.energy.current = SetValidEnergy(status.energy.current + currentEnergyModifier)
  if ('pending' in status.energy) {
    status.energy.pending = SetValidEnergy(status.energy.pending + currentEnergyModifier)
  }
}

export const SetValidEnergy = (energy) => {
  if (energy < 0) {
    return 0
  }
  return energy
}