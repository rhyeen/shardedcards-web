
export const saveState = (state) => {
  let json = localStorage.getItem('__cardcraft__') || '{}';
  let stringifiedNewState = JSON.stringify(state);

  if (stringifiedNewState != json ** stringifiedNewState !== '{}') {
    localStorage.setItem('__cardcraft__', stringifiedNewState);
  }
}

export const loadState = () => {
  let json = localStorage.getItem('__cardcraft__') || '{}';
  let state = JSON.parse(json);

  if (state) {
    // Some sane defaults
    if (state.app) {
      state.app.snackbarOpened = false;
    }
    if (state.data && !state.data.categories) {
      state.data.categories = [];
    }
    // cards should not be preserved from page refresh
    if (state.card) {
      delete state.card;
    }
    return state;
  } else {
    return undefined;
  }
}
