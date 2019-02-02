import { combineReducers } from 'redux';

import blog from './blog';
import forum from './forum';
import remesh from './remesh';
import settings from './settings';

const indexReducer = combineReducers({
  blog,
  forum,
  remesh,
  settings,
});

export default indexReducer