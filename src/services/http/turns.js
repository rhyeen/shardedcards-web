import { BaseHttpPost } from './http.js';

export const CallHttpEndTurn = (turn) => {
  return BaseHttpPost('turns', turn)
}

export const CallHttpStartGame = () => {
  return BaseHttpPost('games')
}