import { BaseHttpPost } from './http.js';

export const CallHttpEndTurn = (turn) => {
  return BaseHttpPost('turns', turn)
}

export const CallStartGame = () => {
  return BaseHttpPost('games')
}