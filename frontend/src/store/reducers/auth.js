import * as actionTypes from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { isAuth: true, user } : { isAuth: false };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADMIN_SIGNUP:
      return state;

    case actionTypes.CUSTOMER_SIGNUP:
      return state;

    case actionTypes.LOGIN_SUCCESS:
      console.log(payload.user);
      return { user: { ...payload.user }, isAuth: true };

    case actionTypes.LOGOUT:
      return { isAuth: false };

    default:
      return state;
  }
};

export default reducer;