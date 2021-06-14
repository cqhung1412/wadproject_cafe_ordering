import * as actionTypes from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { cart: user.cart } : { cart: [] };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_CART_SUCCESS:
      return { cart: [...state.cart, payload.addedProduct] };

    case actionTypes.ADD_PRODUCT_TO_CART:
      return state;

    case actionTypes.ADD_TO_CART_FAILED:
      return state;

    default:
      return state;
  }
};

export default reducer;