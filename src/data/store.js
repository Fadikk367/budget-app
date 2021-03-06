import { applyMiddleware, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'; 

import promiseMiddleware from 'data/middlewares/promise';
import notificationsMiddleware from 'data/middlewares/notifications';
import rootReducer from './reducers';

export default preloadedState => {
  const middlewares = [
    // thunkMiddleware,
    promiseMiddleware,
    notificationsMiddleware
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
