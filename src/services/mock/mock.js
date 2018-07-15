export const POST_CALLBACK_TIME = 2000;
export const GET_CALLBACK_TIME = 500;

export const DebugRequest = (callFunction, requestData) => {
  console.log(callFunction.name + ": REQUEST")  
  if (requestData) {
    console.log(requestData)
  }
}

export const DebugSuccessfulResponse = (callFunction, responseData) => {
  console.log(callFunction.name + ": RESPONSE")
  if (responseData) {
    console.log(responseData)
  }
}