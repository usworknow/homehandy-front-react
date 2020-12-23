
export const types = {
  GET_ALL_REQUEST: 'COMPANIES/GET_ALL_REQUEST',
  GET_ALL_SUCCESS: 'COMPANIES/GET_ALL_SUCCESS',
  GET_ALL_FAILURE: 'COMPANIES/GET_ALL_FAILURE',
  SEARCH_REQUEST: 'COMPANIES/SEARCH_REQUEST',
  SEARCH_SUCCESS: 'COMPANIES/SEARCH_SUCCESS',
  SEARCH_FAILURE: 'COMPANIES/SEARCH_FAILURE',
  GET_REQUEST: 'COMPANIES/GET_REQUEST',
  GET_SUCCESS: 'COMPANIES/GET_SUCCESS',
  GET_FAILURE: 'COMPANIES/GET_FAILURE',
  ADD_REQUEST: 'COMPANIES/ADD_REQUEST',
  ADD_SUCCESS: 'COMPANIES/ADD_SUCCESS',
  ADD_FAILURE: 'COMPANIES/ADD_FAILURE',
  UPDATE_REQUEST: 'COMPANIES/UPDATE_REQUEST',
  UPDATE_SUCCESS: 'COMPANIES/UPDATE_SUCCESS',
  UPDATE_FAILURE: 'COMPANIES/UPDATE_FAILURE',
  LOGO_REQUEST: 'COMPANIES/LOGO_REQUEST',
  LOGO_SUCCESS: 'COMPANIES/LOGO_SUCCESS',
  LOGO_FAILURE: 'COMPANIES/LOGO_FAILURE',
  DOCUMENTS_REQUEST: 'COMPANIES/DOCUMENTS_REQUEST',
  DOCUMENTS_SUCCESS: 'COMPANIES/DOCUMENTS_SUCCESS',
  DOCUMENTS_FAILURE: 'COMPANIES/DOCUMENTS_FAILURE',
}

export const initialState = {
  error: null,
  isLoading: false,
  companyList: [],
  searchResults: [],
  companyDetail: null,
}

export const handleGetCompanies = () => (dispatch) => {
  dispatch({
    types: [types.GET_ALL_REQUEST, types.GET_ALL_SUCCESS, types.GET_ALL_FAILURE],
    url: `/companies/`
  })
}
export const handleSearchCompanies = (search) => (dispatch) => {
  if (!search) { return dispatch(handleGetCompanies()) }
  dispatch({
    types: [types.SEARCH_REQUEST, types.SEARCH_SUCCESS, types.SEARCH_FAILURE],
    url: `/companies/`,
    query: { search }
  })
}
export const handleGetCompanyDetail = (companyId) => (dispatch) => {
  dispatch({
    types: [types.GET_REQUEST, types.GET_SUCCESS, types.GET_FAILURE],
    url: `/companies/${companyId}`
  })
}
const _refresh = (companyId)  => dispatch => {
  dispatch(handleGetCompanies())
  dispatch(handleGetCompanyDetail(companyId))
}
export const handleAddCompany = company => dispatch => {
  dispatch({
    types: [types.ADD_REQUEST, types.ADD_SUCCESS, types.ADD_FAILURE],
    url: '/companies',
    method: 'post',
    data: company,
    callback: handleGetCompanies()
  })
}
export const handleUpdateCompany = company => dispatch => {
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/companies/${company.id}`,
    method: 'put',
    data: company,
    callback: _refresh(company.id)
  })
}
export const handleUpdateLogo = (companyId, file) => (dispatch) => {
  dispatch({
    types: [types.LOGO_REQUEST, types.LOGO_SUCCESS, types.LOGO_FAILURE],
    url: `/companies/${companyId}/logo`,
    method: 'put',
    contentType: 'multipart/form-data',
    data: file,
    timeout: 8000,
    callback: _refresh(companyId)
  })
}
export const handleUpdateDocuments = (companyId, file) => (dispatch) => {
  dispatch({
    types: [types.DOCUMENTS_REQUEST, types.DOCUMENTS_SUCCESS, types.DOCUMENTS_FAILURE],
    url: `/companies/${companyId}/documents`,
    method: 'put',
    contentType: 'multipart/form-data',
    data: file,
    timeout: 8000,
    callback: _refresh(companyId)
  })
}
export const handleUpdateServices = (companyId, services) => (dispatch) => {
  const serviceIds = Object.keys(services).filter(item => services[item]).map(x => Number(x))
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/companies/${companyId}/services`,
    method: 'post',
    data: serviceIds,
    callback: _refresh(companyId)
  })
}

export const handleUpdateServiceAreas = (companyId, areaIds) => (dispatch) => {
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/companies/${companyId}/service_areas`,
    method: 'post',
    data: areaIds,
    callback: _refresh(companyId)
  })
}

export const handleAddPackage = (companyId, servicePackage)  => dispatch => {
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/companies/${companyId}/service_packages`,
    method: 'post',
    data: servicePackage,
    callback: _refresh(companyId)
  })
}
export const handleUpdatePackage = (companyId, servicePackage)  => dispatch => {
  dispatch({
    types: [types.UPDATE_REQUEST, types.UPDATE_SUCCESS, types.UPDATE_FAILURE],
    url: `/companies/${companyId}/service_packages/${servicePackage.id}`,
    method: 'put',
    data: servicePackage,
    callback: _refresh(companyId)
  })
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_REQUEST:
    case types.UPDATE_REQUEST:
    case types.LOGO_REQUEST:
    case types.DOCUMENTS_REQUEST:
    case types.GET_ALL_REQUEST:
    case types.SEARCH_REQUEST:  
    case types.GET_REQUEST:    
      return { ...state, isLoading: true, error: null}
    
    case types.ADD_FAILURE:
    case types.UPDATE_FAILURE:
    case types.LOGO_FAILURE:
    case types.DOCUMENTS_FAILURE:
    case types.GET_ALL_FAILURE:
    case types.SEARCH_FAILURE:   
    case types.GET_FAILURE:
      return { ...state, isLoading: false, error: action.error}

    case types.ADD_SUCCESS:
    case types.LOGO_SUCCESS:
    case types.DOCUMENTS_SUCCESS:
    case types.UPDATE_SUCCESS:
      return { ...state, isLoading: false}
    case types.GET_ALL_SUCCESS:
      return { ...state, isLoading: false, companyList: action.data}
    case types.SEARCH_SUCCESS:
      return { ...state, isLoading: false, searchResults: action.data}
    case types.GET_SUCCESS:
      return { ...state, isLoading: false, companyDetail: action.data}
  
    default:
      return state
  }
}
