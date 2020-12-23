// import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import { sessionSaver } from '../utils/sessionSaver'

export const types = {
  FORGOT_PWD_REQUEST: 'USERS/FORGOT_PWD_REQUEST',
  FORGOT_PWD_SUCCESS: 'USERS/FORGOT_PWD_SUCCESS',
  FORGOT_PWD_FAILURE: 'USERS/FORGOT_PWD_FAILURE',
  PWD_RESET_REQUEST: 'USERS/PWD_RESET_REQUEST',
  PWD_RESET_SUCCESS: 'USERS/PWD_RESET_SUCCESS',
  PWD_RESET_FAILURE: 'USERS/PWD_RESET_FAILURE',
  REGISTRATION_REQUEST: 'USERS/REGISTRATION_REQUEST',
  REGISTRATION_SUCCESS: 'USERS/REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE: 'USERS/REGISTRATION_FAILURE',
  LOGIN_REQUEST: 'USERS/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS/LOGIN_FAILURE',
  ROLE_REQUEST: 'USERS/ROLE_REQUEST',
  ROLE_SUCCESS: 'USERS/ROLE_SUCCESS',
  ROLE_FAILURE: 'USERS/ROLE_FAILURE',
  GOOGLE_REQUEST: 'USERS/GOOGLE_REQUEST',
  GOOGLE_SUCCESS: 'USERS/GOOGLE_SUCCESS',
  GOOGLE_FAILURE: 'USERS/GOOGLE_FAILURE',
  LOGOUT: 'USERS/LOGOUT',
  REMEMBER_ME: 'USERS/REMEMBER_ME',
  CLEAR_ERRORS: 'USERS/CLEAR_ERRORS',
  PASSWORD_EMAIL_SENT: 'USERS/PASSWORD_EMAIL_SENT',
  RESET_PASSWORD_SENT: 'USERS/RESET_PASSWORD_SENT',

  GET_USER_REQUEST: 'USERS/GET_SELF_REQUEST',
  GET_USER_SUCCESS: 'USERS/GET_SELF_SUCCESS',
  GET_USER_FAILURE: 'USERS/GET_SELF_FAILURE',
  UPDATE_USER_REQUEST: 'USERS/UPDATE_SELF_REQUEST',
  UPDATE_USER_SUCCESS: 'USERS/UPDATE_SELF_SUCCESS',
  UPDATE_USER_FAILURE: 'USERS/UPDATE_SELF_FAILURE',
  IMAGE_SUBMIT_REQUEST: 'USERS/IMAGE_SUBMIT_REQUEST',
  IMAGE_SUBMIT_SUCCESS: 'USERS/IMAGE_SUBMIT_SUCCESS', 
  IMAGE_SUBMIT_FAILURE: 'USERS/IMAGE_SUBMIT_FAILURE',
}

export const initialState = {
  error: null,
  googleError: null,
  isLoading: false,
  imageLoading: false,
  rememberMe: false,
  sentReset: false,
  passwordReset: false,
  passwordResetUrl: '',
  userDetail: null,
  session: sessionSaver.getSessionAuthentication()
}

//TODO: get all  users i have access to via user_properties
//TODO: get a specific user, including myself

export const handleGetUser = () => (dispatch) => {
  dispatch({
    types: [types.GET_USER_REQUEST, types.GET_USER_SUCCESS, types.GET_USER_FAILURE],
    url: `/users`,
  })
} 
export const handleUpdateUser = (profile) => (dispatch) => {
  dispatch({
    types: [types.UPDATE_USER_REQUEST, types.UPDATE_USER_SUCCESS, types.UPDATE_USER_FAILURE],
    url: `/users`,
    method: 'put',
    data: profile
  })
}
export const handleUpdateProfileImage = (file) => (dispatch) => {
  dispatch({
    types: [types.IMAGE_SUBMIT_REQUEST, types.IMAGE_SUBMIT_SUCCESS, types.IMAGE_SUBMIT_FAILURE],
    url: `/users/profile_image`,
    method: 'put',
    contentType: 'multipart/form-data',
    data: file,
    timeout: 8000
  })
}
export const handleRegistration = application => dispatch => {
  dispatch({
    types: [types.REGISTRATION_REQUEST, types.REGISTRATION_SUCCESS, types.REGISTRATION_FAILURE],
    url: '/users',
    method: 'post',
    data: application
  })
}
export const handleGoogleAuth = application => dispatch => {
  dispatch({
    types: [types.REGISTRATION_REQUEST, types.REGISTRATION_SUCCESS, types.REGISTRATION_FAILURE],
    url: '/users/google',
    method: 'post',
    data: application
  })
}
export const handleLogin = (email, password) => (dispatch) => {
  dispatch({
    types: [types.LOGIN_REQUEST, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
    url: '/users/local',
    method: 'post',
    data: { email, password }
  })
}

export const handleSwitchRole = () => dispatch => {
  dispatch({
    types: [types.ROLE_REQUEST, types.ROLE_SUCCESS, types.ROLE_FAILURE],
    url: '/users/toggle_profile',
    method: 'patch'
  })
}
export const handleForgotPassword = (email) => dispatch => {
  dispatch({
    types: [types.FORGOT_PWD_REQUEST, types.FORGOT_PWD_SUCCESS, types.FORGOT_PWD_FAILURE],
    url: '/users/local/reset/' + email,
    method: 'post'
  })
}
// export const handlePasswordEmailSent = () => dispatch => {
  // dispatch({ type: types.LOGOUT })
  // dispatch(snackbar.show({
  //   message: 'Thank you for requesting a password reset. An email has been sent to your email address for this account.',
  //   action: 'OK',
  //   handleAction: () => {}
  // }))
// }
export const handlePasswordReset = (email, password, token) => dispatch => {
  dispatch({
    types: [types.PWD_RESET_REQUEST, types.PWD_RESET_SUCCESS, types.PWD_RESET_FAILURE],
    url: '/users/local/reset/' + email,
    method: 'put',
    data: { reset_token: token, new_password: password }
  })
}

export const handleRememberMe = (remember) => {
  return { type: types.REMEMBER_ME, data: remember }
}
export const handleAuthRequested = () => {
  return { type: types.LOGIN_REQUEST }
}
export const handleLogout = () => (dispatch, getState) => {
  dispatch({ type: types.LOGOUT }) // Also handled in reducers index
}
export const resetPasswordSent = () => {
  return { type: types.RESET_PASSWORD_SENT }
}
export const clearAuthErrors = () => {
  return { type: types.CLEAR_ERRORS }
}

export default function (state = initialState, action) {
  switch (action.type) {

    case types.FORGOT_PWD_REQUEST:
    case types.REGISTRATION_REQUEST:
    case types.LOGIN_REQUEST:
    case types.PWD_RESET_REQUEST:
    case types.ROLE_REQUEST:
    case types.GET_USER_REQUEST:
    case types.UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: null }
    case types.IMAGE_SUBMIT_REQUEST:
      return { ...state, imageLoading: true, error: null }
    case types.GOOGLE_REQUEST:
      return { ...state, isLoading: true, googleError: null }

    case types.FORGOT_PWD_SUCCESS:
      return { ...state, isLoading: false, sentReset: true }

    case types.REGISTRATION_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.GOOGLE_SUCCESS:
    case types.ROLE_SUCCESS:
    case types.GET_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.IMAGE_SUBMIT_SUCCESS:
    case types.PWD_RESET_SUCCESS:
      const session = {id: action.data.id, role: action.data.default_profile, token: action.data.token}
      sessionSaver.setSessionAuthentication(session, state.rememberMe)
      return { ...state, passwordReset: action.type === types.PWD_RESET_SUCCESS, imageLoading: false, isLoading: false, userDetail: action.data, session }

    case types.REMEMBER_ME:
      return { ...state, rememberMe: action.data }
    case types.REGISTRATION_FAILURE:
    case types.LOGIN_FAILURE:
    case types.FORGOT_PWD_FAILURE:
    case types.PWD_RESET_FAILURE:
    case types.ROLE_FAILURE:
    case types.GET_USER_FAILURE:
    case types.UPDATE_USER_FAILURE:
      sessionSaver.logout()
      return { ...state, isLoading: false, error: action.error }
    case types.IMAGE_SUBMIT_FAILURE:
      return { ...state, imageLoading: false, error: action.error }
    case types.GOOGLE_FAILURE:
      sessionSaver.logout()
      return { ...state, isLoading: false, googleError: action.error }
    case types.CLEAR_ERRORS:
    case types.LOGOUT:
      sessionSaver.logout()
      return { ...state, ...initialState, session: null }    
    case types.RESET_PASSWORD_SENT:
      return { ...state, passwordReset: false, passwordResetUrl: '', sentReset: false }    
    default:
      return state
  }
}
