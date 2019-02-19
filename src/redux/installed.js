export const TOGGLE_GO_PERMS ='TOGGLE_GO_PERMS';
export const SET_GO_DIR = 'SET_GO_DIR';
export const TOGGLE_TSO_PERMS = 'TOGGLE_TSO_PERMS';
export const SET_TSO_DIR = 'SET_TSO_DIR';
export const TOGGLE_FSO_PERMS = 'TOGGLE_FSO_PERMS';
export const SET_FSO_DIR = 'SET_FSO_DIR';
export const TOGGLE_TS1_PERMS = 'TOGGLE_TS1_PERMS';
export const SET_TS1_DIR = 'SET_TS1_DIR';
export const TOGGLE_ST_PERMS = 'TOGGLE_ST_PERMS';
export const SET_ST_DIR = 'SET_ST_DIR';

// Making these true isn't ideal, but checking permissions is slow on Windows.
const initialState = {
  goDir: '',
  goPerms: true,
  tsoDir: '',
  tsoPerms: true,
  fsoDir: '',
  fsoPerms: true,
  ts1Dir: '',
  ts1Perms: true,
  stDir: '',
  // Needs to be installed locally, so always true
  stPerms: true,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_GO_PERMS:
      return {
        ...state,
        goPerms: action.data,
      };
    case SET_GO_DIR:
      return {
        ...state,
        goDir: action.data,
      };
    case TOGGLE_TSO_PERMS:
      return {
        ...state,
        tsoPerms: action.data,
      };
    case SET_TSO_DIR:
      return {
        ...state,
        tsoDir: action.data,
      };
    case TOGGLE_FSO_PERMS:
      return {
        ...state,
        fsoPerms: action.data,
      };
    case SET_FSO_DIR:
      return {
        ...state,
        fsoDir: action.data,
      };
    case TOGGLE_TS1_PERMS:
      return {
        ...state,
        ts1Perms: action.data,
      };
    case SET_TS1_DIR:
      return {
        ...state,
        ts1Dir: action.data,
      };
    case TOGGLE_ST_PERMS:
      return {
        ...state,
        stPerms: action.data,
      };
    case SET_ST_DIR:
      return {
        ...state,
        stDir: action.data,
      };
    default:
      return state;
  }
}

export const toggleGoPerms = data => ({ type: TOGGLE_GO_PERMS, data });
export const setGoDir = data => ({ type: SET_GO_DIR, data });
export const toggleTsoPerms = data => ({ type: TOGGLE_TSO_PERMS, data });
export const setTsoDir = data => ({ type: SET_TSO_DIR, data });
export const toggleFsoPerms = data => ({ type: TOGGLE_FSO_PERMS, data });
export const setFsoDir = data => ({ type: SET_FSO_DIR, data });
export const toggleTs1Perms = data => ({ type: TOGGLE_TS1_PERMS, data });
export const setTs1Dir = data => ({ type: SET_TS1_DIR, data });
export const toggleStPerms = data => ({ type: TOGGLE_ST_PERMS, data });
export const setStDir = data => ({ type: SET_ST_DIR, data });