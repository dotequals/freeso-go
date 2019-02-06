const TOGGLE_ONLINE_STATUS = 'TOGGLE_ONLINE_STATUS';

const initialState = {
  online: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_ONLINE_STATUS:
      console.log(action);
      return {
        ...state,
        online: action.data,
      };
    default:
      return state;
  }
}

export const toggleOnlineStatus = data => ({ type: TOGGLE_ONLINE_STATUS, data });