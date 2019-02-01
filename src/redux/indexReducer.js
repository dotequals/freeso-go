import { combineReducers } from 'redux';

import blog from './blog';
import forum from './forum';
import settings from './settings';

const indexReducer = combineReducers({
  blog,
  forum,
  settings,
});

export default indexReducer