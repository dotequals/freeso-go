import { combineReducers } from 'redux';

import blog from './blog';
import forum from './forum';
import remesh from './remesh';
import settings from './settings';
import system from './system';

const indexReducer = combineReducers({
  blog,
  forum,
  remesh,
  settings,
  system,
});

export default indexReducer