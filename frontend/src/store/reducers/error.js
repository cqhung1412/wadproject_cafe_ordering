import * as actionTypes from '../actions/actionTypes';

const initState = {
  error: null
};

const reducer = (state = initState, action) => {
  const { error } = action;

  if (error) {
    return {
      error: error
    }
  } else if (action.type === actionTypes.HIDE_ERROR) {
    return {
      error: null
    }
  }

  return state;
}

export default reducer