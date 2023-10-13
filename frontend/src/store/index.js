import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import listingsReducer from './listings';
import sessionReducer from './session';
import reservationsReducer from './reservations';
import reviewsReducer from './reviews';
import uiReducer from './ui'
import errorsReducer from './errors'
import entitiesReducer from './entities';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  errors: errorsReducer
}) 




let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
