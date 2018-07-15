import { 
  DebugRequest,
  DebugSuccessfulResponse,
  GET_CALLBACK_TIME } from './mock.js';

export const CallMockGetHand = (turn) => {
  return new Promise((resolve, reject) => {
    DebugRequest(CallMockGetHand, turn)
    setTimeout(() => {
      const response = [
        {
          id: 'test',
          instance: '0'
        },
        {
          id: 'hero',
          instance: '1'
        },
        {
          id: 'pawn',
          instance: '0'
        },
        {
          id: 'monster',
          instance: '0'
        },
        {
          id: 'beast',
          instance: '1'
        }
      ]
      DebugSuccessfulResponse(CallMockGetHand, response)
      resolve(response)
    }, GET_CALLBACK_TIME)
  })
}
