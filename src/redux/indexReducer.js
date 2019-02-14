import { combineReducers } from 'redux';

import blog from './blog';
import forum from './forum';
import installed from './installed';
import remesh from './remesh';
import settings from './settings';
import system from './system';

const indexReducer = combineReducers({
  blog,
  forum,
  installed,
  remesh,
  settings,
  system,
});

export default indexReducer;