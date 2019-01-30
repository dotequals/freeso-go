import { combineReducers } from 'redux';

import settings from './settings';

const indexReducer = combineReducers({
  settings,
});

export default indexReducer