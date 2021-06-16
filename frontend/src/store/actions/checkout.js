import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'


const onCheckoutFailed = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
}

export const createOrder = () => {
  return dispatch => {
    dispatch({ type: actionTypes.CHECKOUT });
    const user = localStorage.getItem('user');
    const { token, cart } = user;
    axios.post('/order', cart, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 201 || 200)
          dispatch({ type: actionTypes.CHECKOUT_SUCCESS, payload: cart });
      })
      .catch(error => dispatch(onCheckoutFailed(error)));
  };
}