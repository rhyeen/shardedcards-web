export const UPDATE_CRAFTED_STYLE = 'UPDATE_CRAFTED_STYLE';
export const UPDATE_CRAFTED_CLASSES = 'UPDATE_CRAFTED_CLASSES';
export const UPDATE_CRAFTED_TEXT = 'UPDATE_CRAFTED_TEXT';
export const UPDATE_CRAFTED_NAME = 'UPDATE_CRAFTED_NAME';
export const SAVING_CRAFTED_COMPONENT = 'SAVING_CRAFTED_COMPONENT';
export const SAVED_CRAFTED_COMPONENT = 'SAVED_CRAFTED_COMPONENT';
export const FAIL_SAVE_CRAFTED_COMPONENT = 'FAIL_SAVE_CRAFTED_COMPONENT';

export const actionUpdateCraftedStyle = (craftedStyle) => {
  return {
    type: UPDATE_CRAFTED_STYLE,
    craftedStyle
  }
};

export const actionUpdateCraftedClasses = (craftedClasses) => {
  return {
    type: UPDATE_CRAFTED_CLASSES,
    craftedClasses
  }
};

export const actionUpdateCraftedText = (craftedText) => {
  return {
    type: UPDATE_CRAFTED_TEXT,
    craftedText
  }
};

export const actionUpdateCraftedName = (craftedName) => {
  return {
    type: UPDATE_CRAFTED_NAME,
    craftedName
  }
};

export const saveCraftedComponent = (id, style, classes, text) => (dispatch) => {
  dispatch(savingCraftedComponent(id));
  fetch(`http://localhost:6250/crafted-component/${id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        style,
        classes,
        text,
      })
    })
    .then(res => res.json())
    .then(data => dispatch(savedCraftedComponent(id, data)))
    .catch(() => dispatch(failSaveCraftedComponent(id)));
}

const savingCraftedComponent = (id) => {
  return {
    type: SAVING_CRAFTED_COMPONENT,
    id
  };
};

const savedCraftedComponent = (id) => {
  return {
    type: FAIL_SAVE_CRAFTED_COMPONENT,
    id
  };
};

const failSaveCraftedComponent = (id) => {
  return {
    type: SAVED_CRAFTED_COMPONENT,
    id
  };
};