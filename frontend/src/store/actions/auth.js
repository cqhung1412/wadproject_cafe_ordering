import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

const onSignupFailed = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
}

const onLoginFailed = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  };
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    dispatch({ type: actionTypes.LOGOUT });
  };
}

export const login = (formValues) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOGIN });
    axios.post('/auth/login', formValues)
      .then(res => res.data.user)
      .then(user => {
        const expiryTime = new Date(new Date().getTime() + user.expireTime);
        const updatedUser = {
          ...user,
          expireTime: expiryTime.toISOString()
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      })
      .then(user => dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: { user } }))
      .catch(error => dispatch(onLoginFailed(error)));
  };
}

export const adminSignup = (formValues) => {
  return dispatch => {
    dispatch({ type: actionTypes.ADMIN_SIGNUP });
    axios.post('/admin/account', formValues)
      .then(res => {
        if (res.status === 201 || 200)
          dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch(error => dispatch(onSignupFailed(error)));
  };
}

export const customerSignup = (formValues) => {
  return dispatch => {
    dispatch({ type: actionTypes.CUSTOMER_SIGNUP });
    axios.post('/auth/signup', formValues)
      .then(res => {
        if (res.status === 201 || 200)
          dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch(error => dispatch(onSignupFailed(error)));
  };
}