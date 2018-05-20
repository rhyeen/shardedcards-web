import { UPDATE_CRAFTED_STYLE, UPDATE_CRAFTED_CLASSES, UPDATE_CRAFTED_TEXT } from '../actions/crafted.js';

const app = (state = {craftedStyle:'', craftedClasses:'', craftedText:'hello world'}, action) => {
  switch (action.type) {
    case UPDATE_CRAFTED_STYLE:
      return {
        ...state,
        craftedStyle: action.craftedStyle
      }
    case UPDATE_CRAFTED_CLASSES:
      return {
        ...state,
        craftedClasses: action.craftedClasses
      }
    case UPDATE_CRAFTED_TEXT:
      return {
        ...state,
        craftedText: action.craftedText
      }
    default:
      return state;
  }
}

export default app;
