import * as actionTypes from './actionTypes'

export const addProductToCart = product => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_PRODUCT_TO_CART });
    let storedUser = JSON.parse(localStorage.getItem('user'));
    let userCart = storedUser.cart;
    userCart.push(product);
    storedUser.cart = userCart;
    localStorage.setItem('user', JSON.stringify(storedUser));
    dispatch({
      type: actionTypes.ADD_TO_CART_SUCCESS,
      payload: { addedProduct: product }
    });
  }
}