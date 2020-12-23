

export const types = {
  GET_REQUEST: 'SERVICE_AREAS/GET_REQUEST',
  GET_SUCCESS: 'SERVICE_AREAS/GET_SUCCESS',
  GET_FAILURE: 'SERVICE_AREAS/GET_FAILURE',
}

export const initialState = {
  error: null,
  isLoading: false,
  service_areas: []
}

export const handleGetServiceAreas = () => (dispatch) => {
  dispatch({
    types: [types.GET_REQUEST, types.GET_SUCCESS, types.GET_FAILURE],
    url: `/service_areas`
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_REQUEST:
      return { ...state, isLoading: true, error: null}
    case types.GET_FAILURE:
      return { ...state, isLoading: false, error: action.error}
    case types.GET_SUCCESS:
      return { ...state, isLoading: false, service_areas: action.data}
    default:
      return state
  }
}
