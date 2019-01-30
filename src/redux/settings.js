const CHANGE_GRAPHICS_MODE = 'CHANGE_GRAPHICS_MODE';
const TOGGLE_3D = 'TOGGLE_3D';
const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
const CHANGE_ACCENT_COLOR = 'CHANGE_ACCENT_COLOR';

const initialState = {
  darkTheme: true,
  accent: '#3faced',
  graphics: 'OpenGL',
  _3d: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_GRAPHICS_MODE:
      return {
        ...state,
        graphics: action.data,
      }
    case TOGGLE_3D:
      return {
        ...state,
        _3d: action.data,
      };
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkTheme: action.data,
      };
    case CHANGE_ACCENT_COLOR:
      return {
        ...state,
        accent: action.data,
      }
    default:
      return state;
  }
}

export const changeGraphicsMode = data => ({ type: CHANGE_GRAPHICS_MODE, data });
export const toggle3d = data => ({ type: TOGGLE_3D, data });
export const toggleDarkMode = data => ({ type: TOGGLE_DARK_MODE, data });
export const changeAccentColor = data => ({ type: CHANGE_ACCENT_COLOR, data });