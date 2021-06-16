import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import authReducer from './reducers/auth';
import errorReducer from './reducers/error';
import productReducer from './reducers/product';
import cartReducer from './reducers/cart';
import orderReducer from './reducers/order';

const loggerMiddleware = createLogger();

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducer = combineReducers({
  auth:   authReducer,
  error:  errorReducer,
  prod:   productReducer,
  cart:   cartReducer,
  order:  orderReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
);

export default store;