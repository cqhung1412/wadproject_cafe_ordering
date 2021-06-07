import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

const onFetchProductsFailed = error => {
  return {
    type: actionTypes.SET_ERROR,
    error: error
  }
}


export const getProductsGroupByCategories = () => {
  return dispatch => {
    axios.get('/category-products')
      .then(res => res.data.products)
      .then(products => {
        const categories = products.map(p => p.category);
        dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: { products, categories } });
      })
      .catch(error => dispatch(onFetchProductsFailed(error)));
  }
}