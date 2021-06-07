import * as actionTypes from '../actions/actionTypes';

const initialState = { products: [], categories: [] };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        categories: payload.categories
      };
        
    default:
      return state;
  }
}

export default reducer;