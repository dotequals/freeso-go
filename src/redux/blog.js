import { call, put, takeLatest } from 'redux-saga/effects';

import fetchXml from "../utils/api/fetchXml";

export const REQUEST_BLOG_DATA = 'REQUEST_BLOG_DATA';
export const ERROR_BLOG_DATA = 'ERROR_BLOG_DATA';
export const RECEIVE_BLOG_DATA = 'RECEIVE_BLOG_DATA';

const initialState = {
  data: '',
  error: '',
  lastUpdate: undefined,
  loading: false,
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case REQUEST_BLOG_DATA:
      return {
        ...state,
        loading: true,
      };
    case ERROR_BLOG_DATA:
      return {
        ...state,
        error: action.data,
      };
    case RECEIVE_BLOG_DATA:
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

export const requestBlogData = () => ({ type: REQUEST_BLOG_DATA });
export const errorBlogData = data => ({ type: ERROR_BLOG_DATA, data });
export const receiveBlogData = data => ({ type: RECEIVE_BLOG_DATA, data, date: Date.now() });

const blogUrl = 'https://freeso.org/feed/';
export function* getBlogData() {
  try {
    const data = yield call(fetchXml, blogUrl);
    yield put(receiveBlogData(data));
  } catch (error) {
    console.log(error);
    yield put(errorBlogData(error.message));
  }
}

export function* blogWatcher() {
  yield takeLatest(REQUEST_BLOG_DATA, getBlogData);
}