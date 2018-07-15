import { BaseEndpoint } from '../service-state.js';

export const HTTP_REQUEST_GET = 'get';
export const HTTP_REQUEST_POST = 'post';
export const HTTP_REQUEST_PUT = 'put';
export const HTTP_REQUEST_DELETE = 'delete';

export const BaseHttpPost = (endpoint, bodyData) => {
  return HttpJsonRequest(`${BaseEndpoint}/${endpoint}`, HTTP_REQUEST_POST, bodyData)
}

export const BaseHttpGet = (endpoint) => {
  return HttpJsonRequest(`${BaseEndpoint}/${endpoint}`, HTTP_REQUEST_GET)
}

export const JsonHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

export const HttpJsonRequest = (url, request, bodyData) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: request,
      headers: JsonHeaders(),
      body: JSON.stringify(data)
    })
    .then(res => resolve(res.json()))
    .catch(err => reject(err))
  })
}