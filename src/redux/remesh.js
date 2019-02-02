import { call, put, takeLatest } from 'redux-saga/effects';

import fetchReleases from "../utils/api/fetchReleases";

export const REQUEST_REMESH_DATA = 'REQUEST_REMESH_DATA';
export const ERROR_REMESH_DATA = 'ERROR_REMESH_DATA';
export const RECEIVE_REMESH_DATA = 'RECEIVE_REMESH_DATA';
export const SET_INSTALLED_DATE = 'SET_INSTALLED_DATE';

const initialState = {
  available: undefined,
  availableUrl: '',
  error: '',
  installed: undefined,
  loading: false,
}

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case REQUEST_REMESH_DATA:
      return {
        ...state,
        loading: true,
      };
    case ERROR_REMESH_DATA:
      return {
        ...state,
        error: action.data,
      };
    case RECEIVE_REMESH_DATA:
      const release = action.data && action.data[0] ? action.data[0] : {};
      const available = release.tag_name;
      const availableUrl = release.zipball_url;

      return {
        ...state,
        available,
        availableUrl,
        error: '',
        loading: false,
      };
    case SET_INSTALLED_DATE:
      return {
        ...state,
        installed: action.data,
      }
    default:
      return state;
  }
}

export const requestRemeshData = () => ({ type: REQUEST_REMESH_DATA });
export const errorRemeshData = data => ({ type: ERROR_REMESH_DATA, data });
export const recieveRemeshData = data => ({ type: RECEIVE_REMESH_DATA, data });

const owner = 'dotequals';
const repo = 'freeso-remesh-package';

export function* getRemeshData() {
  try {
    const data = yield call(fetchReleases, owner, repo);
    yield put(recieveRemeshData(data));
  } catch (error) {
    console.log(error);
    yield put(errorRemeshData(error));
  }
}

export function* remeshWatcher() {
  yield takeLatest(REQUEST_REMESH_DATA, getRemeshData);
}