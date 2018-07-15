export const INTERFACE_HTTP = 'http';
export const INTERFACE_MOCK = 'mock';

export const RUN_LOCAL = 'local';
export const RUN_PRODUCTION = 'prod';

export const InterfaceState = () => {
  return INTERFACE_MOCK
}

export const InvalidInterfaceState = () => {
  return new Error(`Invalid interface state: ${InterfaceState()}`)
}

export const RunState = () => {
  return RUN_LOCAL
}

export const BaseEndpoint = () => {
  switch (RunState()) {
    case RUN_LOCAL:
      return 'http://localhost:6250'
    case RUN_PRODUCTION:
      return ''
    default:
      return new Error(`Invalid run state: ${RunState()}`)
  }
}