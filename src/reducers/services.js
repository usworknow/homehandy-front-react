

export const types = {
  GET_REQUEST: 'SERVICES/GET_REQUEST',
  GET_SUCCESS: 'SERVICES/GET_SUCCESS',
  GET_FAILURE: 'SERVICES/GET_FAILURE',
}

export const initialState = {
  error: null,
  isLoading: false,
  services: []
}

export const handleGetServices = () => (dispatch) => {
  dispatch({
    types: [types.GET_REQUEST, types.GET_SUCCESS, types.GET_FAILURE],
    url: `/services`
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_REQUEST:
      return { ...state, isLoading: true, error: null}
    case types.GET_FAILURE:
      return { ...state, isLoading: false, error: action.error}
    case types.GET_SUCCESS:
      return { ...state, isLoading: false, services: action.data}
    default:
      return state
  }
}
