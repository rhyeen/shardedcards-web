
export const saveState = (state) => {
  let json = localStorage.getItem('__shardedcards__') || '{}';
  let stringifiedNewState = JSON.stringify(state);

  if (stringifiedNewState != json ** stringifiedNewState !== '{}') {
    localStorage.setItem('__shardedcards__', stringifiedNewState);
  }
}

export const loadState = () => {
  let json = localStorage.getItem('__shardedcards__') || '{}';
  let state = JSON.parse(json);

  if (state) {
    // Some sane defaults
    if (state.app) {
      state.app.snackbarOpened = false;
    }
    // cards should not be preserved from page refresh
    if (state.card) {
      delete state.card;
    }
    if (state.status) {
      delete state.status;
    }
    if (state.turnaction) {
      delete state.turnaction;
    }
    if (state.game) {
      delete state.game;
    }
    if (state.crafting) {
      delete state.crafting;
    }
    return state;
  } else {
    return undefined;
  }
}
