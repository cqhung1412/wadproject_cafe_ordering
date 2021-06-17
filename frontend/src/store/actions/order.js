import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'


const onDispatchFailed = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
}

export const createOrder = () => {
  return dispatch => {
    dispatch({ type: actionTypes.CHECKOUT });
    const user = JSON.parse(localStorage.getItem('user'));
    const { token, cart } = user;

    axios.post('/order', { products: cart }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 201 || 200) {
          console.log(res);
          user.cart = [];
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: actionTypes.CHECKOUT_SUCCESS, payload: { newOrder: res.data.order } });
        }
      })
      .catch(error => dispatch(onDispatchFailed(error)));
  };
}

export const getOrders = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ORDERS });
    const user = localStorage.getItem('user');
    const { token } = user;
    axios.get('/orders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200)
          dispatch({
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            payload: { orders: res.data.orders }
          });
      })
      .catch(error => dispatch(onDispatchFailed(error)));
  }
}