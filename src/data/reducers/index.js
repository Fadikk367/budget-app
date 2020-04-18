import { combineReducers } from 'redux';

import commonReducer from './commonReducer';
import budgetReducer from './budgetReducer';

const rootReducer = combineReducers({
  common: commonReducer,
  budget: budgetReducer
});

export default rootReducer;