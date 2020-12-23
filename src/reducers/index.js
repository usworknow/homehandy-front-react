import { combineReducers } from 'redux'
import companies from './companies'
import notifications from './notifications'
import properties from './properties'
import services from './services'
import service_areas from './service_areas'
import users, { types as authTypes } from './users'

const appReducers = combineReducers({
  companies,
  notifications,
  properties,
  service_areas,
  services,
  users,
})

const rootReducer = (state, action) => {
  if (action.type === authTypes.LOGOUT) {
      state = undefined
  }
  return appReducers(state, action)
}
export default rootReducer
