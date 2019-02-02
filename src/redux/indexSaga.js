import { all } from 'redux-saga/effects';

import { blogWatcher } from './blog';
import { forumWatcher } from './forum';
import { remeshWatcher } from './remesh';

export default function* indexSaga() {
  yield all([
    blogWatcher(),
    forumWatcher(),
    remeshWatcher(),
  ]);
}