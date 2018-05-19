
export const saveState = (state) => {
  let json = localStorage.getItem('__vizeb__') || '{}';
  let stringifiedNewState = JSON.stringify(state);

  if (stringifiedNewState != json ** stringifiedNewState !== '{}') {
    localStorage.setItem('__vizeb__', stringifiedNewState);
  }
}

export const loadState = () => {
  let json = localStorage.getItem('__vizeb__') || '{}';
  let state = JSON.parse(json);

  if (state) {
    // Some sane defaults
    if (state.app) {
      state.app.snackbarOpened = false;
    }
    if (state.data && !state.data.categories) {
      state.data.categories = [];
    }
    return state;
  } else {
    return undefined;
  }
}
