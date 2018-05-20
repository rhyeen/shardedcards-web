export const UPDATE_CRAFTED_STYLE = 'UPDATE_CRAFTED_STYLE';
export const UPDATE_CRAFTED_CLASSES = 'UPDATE_CRAFTED_CLASSES';
export const UPDATE_CRAFTED_TEXT = 'UPDATE_CRAFTED_TEXT';

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

