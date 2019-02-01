import { all } from 'redux-saga/effects';

import { blogWatcher } from './blog';
import { forumWatcher } from './forum';

export default function* indexSaga() {
  yield all([
    blogWatcher(),
    forumWatcher(),
  ]);
}