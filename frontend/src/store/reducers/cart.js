import * as actionTypes from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { cart: user.cart } : { cart: [] };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_TO_CART_SUCCESS:
      let newCart = state.cart;
      newCart.push(payload.addedProduct);
      return { cart: newCart };

    case actionTypes.ADD_PRODUCT_TO_CART:
      return state;

    case actionTypes.ADD_TO_CART_FAILED:
      return state;

    case actionTypes.REMOVE_FROM_CART_SUCCESS:
      let removingCart = state.cart;
      removingCart.splice(payload.productIndex, 1);
      return { cart: removingCart };

    case actionTypes.CHECKOUT_SUCCESS:
      return { cart: [] }

    default:
      return state;
  }
};

export default reducer;