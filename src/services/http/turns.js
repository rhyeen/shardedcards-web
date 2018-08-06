import { 
  BaseHttpPost,
  BaseHttpGet } from './http.js';

export const CallHttpEndTurn = (turn) => {
  return BaseHttpPost('turns', turn)
}

export const CallHttpStartGame = () => {
  return BaseHttpPost('games')
}

export const CallHttpBeginTurn = (turn) => {
  return BaseHttpGet('turns')
}