export const POST_CALLBACK_TIME = 200;
export const GET_CALLBACK_TIME = 200;

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

export const PrepareResponse = (response) => {
  return JSON.parse(JSON.stringify(response))
}