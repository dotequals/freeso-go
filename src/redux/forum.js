import { call, put, takeLatest } from 'redux-saga/effects';

import fetchXml from "../utils/api/fetchXml";

export const REQUEST_FORUM_DATA = 'REQUEST_FORUM_DATA';
export const ERROR_FORUM_DATA = 'ERROR_FORUM_DATA';
export const RECEIVE_FORUM_DATA = 'RECEIVE_FORUM_DATA';

const initialState = {
  data: '',
  error: '',
  lastUpdate: undefined,
  loading: false,
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case REQUEST_FORUM_DATA:
      return {
        ...state,
        loading: true,
      };
    case ERROR_FORUM_DATA:
      return {
        ...state,
        error: action.data,
      };
    case RECEIVE_FORUM_DATA:
      return {
        ...state,
        data: action.data,
        error: '',
        loading: false,
        lastUpdate: action.date,
      };
    default:
      return state;
  }
}

export const requestForumData = () => ({ type: REQUEST_FORUM_DATA });
export const errorForumData = data => ({ type: ERROR_FORUM_DATA, data });
export const receiveForumData = data => ({ type: RECEIVE_FORUM_DATA, data, date: Date.now() });

const forumUrl = 'http://forum.freeso.org/forums/-/index.rss';
export function* getForumData() {
  try {
    const data = yield call(fetchXml, forumUrl);
    yield put(receiveForumData(data));
  } catch (error) {
    console.log(error);
    yield put(errorForumData(error));
  }
}

export function* forumWatcher() {
  yield takeLatest(REQUEST_FORUM_DATA, getForumData);
}