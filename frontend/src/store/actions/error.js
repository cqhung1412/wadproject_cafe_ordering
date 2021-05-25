import * as actionTypes from './actionTypes'

export function setError(error) {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  }
}

export function hideError() {
  return {
    type: actionTypes.HIDE_ERROR
  }
}