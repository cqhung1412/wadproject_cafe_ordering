import * as actionTypes from '../actions/actionTypes';

const initialState = { orders: [] };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_ORDERS:
      return state;

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders
      }

    case actionTypes.FETCH_ORDERS_FAILED:
      return state;

    default:
      return state;
  }
};

export default reducer;