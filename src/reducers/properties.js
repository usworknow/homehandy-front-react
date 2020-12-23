
export const types = {
  GET_ALL_REQUEST: 'PROPERTIES/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'PROPERTIES/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'PROPERTIES/GET_ALL_FAILURE',
  SEARCH_REQUEST: 'PROPERTIES/SEARCH_REQUEST',
  SEARCH_SUCCESS: 'PROPERTIES/SEARCH_SUCCESS',
  SEARCH_FAILURE: 'PROPERTIES/SEARCH_FAILURE',
  GET_REQUEST: 'PROPERTIES/GET_REQUEST',
  GET_SUCCESS: 'PROPERTIES/GET_SUCCESS',
  GET_FAILURE: 'PROPERTIES/GET_FAILURE',
  ADD_REQUEST: 'PROPERTIES/ADD_REQUEST',
  ADD_SUCCESS: 'PROPERTIES/ADD_SUCCESS',
  ADD_FAILURE: 'PROPERTIES/ADD_FAILURE',
  UPDATE_REQUEST: 'PROPERTIES/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'PROPERTIES/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'PROPERTIES/UPDATE_FAILURE',
}

export const initialState = {
  error: null,
  isLoading: false,
  propertyList: [],
  searchResults: [],
  propertyDetail: null,
}

export const handleGetProperties = () => (dispatch) => {
  dispatch({
    types: [types.GET_ALL_REQUEST, types.GET_ALL_SUCCESS, types.GET_ALL_FAILURE],
    url: `/properties/`
  })
}
export const handleSearchProperties = (search) => (dispatch) => {
  if (!search) { return dispatch(handleGetProperties()) }
  dispatch({
    types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
    url: `/properties/`,
    query: { search }
  })
}
export const handleGetPropertyDetail = (propertyId) => (dispatch) => {
  dispatch({
    types: [types.GET_REQUEST, types.GET_SUCCESS, types.GET_FAILURE],
    url: `/properties/${propertyId}`
  })
}
const _refresh = (propertyId)  => dispatch => {
  dispatch(handleGetProperties())
  dispatch(handleGetPropertyDetail(propertyId))
}
export const handleAddProperty = property => dispatch => {
  dispatch({
    types: [types.ADD_REQUEST, types.ADD_SUCCESS, types.ADD_FAILURE],
    url: '/properties',
    method: 'post',
    data: property,
    callback: handleGetProperties()
  })
}
export const handleUpdateProperty = property => dispatch => {
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/properties/${property.id}`,
    method: 'put',
    data: property,
    callback: _refresh(property.id)
  })
}

export const handleUpdateServices = (propertyId, services) => (dispatch) => {
  const serviceKeys = Object.keys(services).filter(item => services[item]).map(x => Number(x))
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/properties/${propertyId}/services`,
    method: 'post',
    data: serviceKeys,
    callback: _refresh(propertyId)
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_REQUEST:
    case types.UPDATE_REQUEST:
    case types.GET_ALL_REQUEST:
    case types.SEARCH_REQUEST:  
    case types.GET_REQUEST:    
      return { ...state, isLoading: true, error: null}
    
    case types.ADD_FAILURE:
    case types.UPDATE_FAILURE:
    case types.GET_ALL_FAILURE:
    case types.SEARCH_FAILURE:   
    case types.GET_FAILURE:
      return { ...state, isLoading: false, error: action.error}

    case types.ADD_SUCCESS:
    case types.UPDATE_SUCCESS:
      return { ...state, isLoading: false}
    case types.GET_ALL_SUCCESS:
      return { ...state, isLoading: false, propertyList: action.data}
    case types.SEARCH_SUCCESS:
      return { ...state, isLoading: false, searchResults: action.data}
    case types.GET_SUCCESS:
      return { ...state, isLoading: false, propertyDetail: action.data}
  
    default:
      return state
  }
}
