import { connect, send } from '@giantmachines/redux-websocket'

export const types = {
  SETTINGS_REQUEST: 'NOTIFICATIONS/SETTINGS_REQUEST',
  SETTINGS_FAILURE: 'NOTIFICATIONS/SETTINGS_FAILURE',
  SETTINGS_GET_SUCCESS: 'NOTIFICATIONS/GET_SETTINGS_SUCCESS',
  SETTINGS_UPDATE_SUCCESS: 'NOTIFICATIONS/UPDATE_SETTINGS_SUCCESS',
  LOGS_REQUEST: 'NOTIFICATIONS/LOGS_REQUEST',
  LOGS_FAILURE: 'NOTIFICATIONS/LOGS_FAILURE',
  LOGS_SUCCESS: 'NOTIFICATIONS/LOGS_SUCCESS',
  GET_CHANNELS_REQUEST: 'NOTIFICATIONS/GET_CHANNELS_REQUEST',
  GET_CHANNELS_FAILURE: 'NOTIFICATIONS/GET_CHANNELS_FAILURE',
  GET_CHANNELS_SUCCESS: 'NOTIFICATIONS/GET_CHANNELS_SUCCESS',
  CREATE_CHANNELS_REQUEST: 'NOTIFICATIONS/CREATE_CHANNELS_REQUEST',
  CREATE_CHANNELS_FAILURE: 'NOTIFICATIONS/CREATE_CHANNELS_FAILURE',
  CREATE_CHANNELS_SUCCESS: 'NOTIFICATIONS/CREATE_CHANNELS_SUCCESS',
  INITIAL_MESSAGE: 'NOTIFICATIONS/SET_INITIAL_MESSAGE',
  SET_SELECTED_CHANNEL: 'NOTIFICATIONS/SET_SELECTED_CHANNEL',
  MESSAGE_INDICATOR: 'NOTIFICATIONS/MESSAGE_INDICATOR',
  CHANNEL_DETAIL_REQUEST: 'NOTIFICATIONS/CHANNEL_DETAIL_REQUEST',
  CHANNEL_DETAIL_FAILURE: 'NOTIFICATIONS/CHANNEL_DETAIL_FAILURE',
  CHANNEL_DETAIL_SUCCESS: 'NOTIFICATIONS/CHANNEL_DETAIL_SUCCESS',
  CHANNEL_SEEN_REQUEST: 'NOTIFICATIONS/CHANNEL_SEEN_REQUEST',
  CHANNEL_SEEN_FAILURE: 'NOTIFICATIONS/CHANNEL_SEEN_FAILURE',
  CHANNEL_SEEN_SUCCESS: 'NOTIFICATIONS/CHANNEL_SEEN_SUCCESS',
  MARK_READ_REQUEST: 'NOTIFICATIONS/MARK_READ_REQUEST',
  MARK_READ_FAILURE: 'NOTIFICATIONS/MARK_READ_FAILURE',
  MARK_READ_SUCCESS: 'NOTIFICATIONS/MARK_READ_SUCCESS',
  SET_SELECTED_MEMBERS: 'NOTIFICATIONS/SET_SELECTED_MEMBERS',
  HIDE_CHANNEL_REQUEST: 'NOTIFICATIONS/HIDE_CHANNEL_REQUEST',
  HIDE_CHANNEL_SUCCESS: 'NOTIFICATIONS/HIDE_CHANNEL_SUCCESS',
  HIDE_CHANNEL_FAILURE: 'NOTIFICATIONS/HIDE_CHANNEL_FAILURE',
  INTRODUCTION_REQUEST: 'NOTIFICATIONS/INTRODUCTION_REQUEST',
  INTRODUCTION_SUCCESS: 'NOTIFICATIONS/INTRODUCTION_SUCCESS',
  INTRODUCTION_FAILURE: 'NOTIFICATIONS/INTRODUCTION_FAILURE'
}

export const initialState = {
  notification_settings: {},
  logs: [],
  channels: [],
  selectedMembers: [],
  selectedChannel: null,
  initialChatMessage: '',
  messageIndicator: [],
  channelDetail: null,
  error: null,
  isLoading: false
}
export const handleConnectNotifications = (email) => dispatch => {
  if (!email) { return }
  dispatch(connect(process.env.REACT_APP_BASE_URL.replace('http', 'ws') + '/notifications/' + email))
}
export const handleGetNotificationLogs = (email) => dispatch => {
  if (!email) { return }
  dispatch({
    types: [types.LOGS_REQUEST, types.LOGS_SUCCESS, types.LOGS_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/logs`,
  })
}
export const handleGetMessageChannels = (email) => dispatch => {
  if (!email) { return }
  dispatch({
    types: [types.GET_CHANNELS_REQUEST, types.GET_CHANNELS_SUCCESS, types.GET_CHANNELS_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/chats`,
  })
}
export const handleHideMessageChannels = (email, channel) => dispatch => {
  if (!email || !channel || !channel.id) { return }
  let params = { hide_channels: [channel.id] }
  if (channel.last_message && channel.last_message.id) {
    params.seen = [{channel_id: channel.id, message_id: channel.last_message.id }]
  }
  dispatch({
    types: [types.HIDE_CHANNEL_REQUEST, types.HIDE_CHANNEL_SUCCESS, types.HIDE_CHANNEL_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/chats`,
    method: 'patch',
    data: params,
    callback: handleGetMessageChannels(email)
  })
}
export const handleCreateNewChannel = (email, members, message, name) => dispatch => {
  if (!email || !members || !message) { return }
  if (!Array.isArray(members)) { members = [members]}
  if (!name) { name = '' }
  dispatch({ type: types.INITIAL_MESSAGE, data: message })
  dispatch({
    types: [types.CREATE_CHANNELS_REQUEST, types.CREATE_CHANNELS_SUCCESS, types.CREATE_CHANNELS_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/chats`,
    method: 'put',
    data: { name, members, message },
    // callback: handleGetMessageChannels(email)
  })
}
export const handleSendNewMessage = (channelId, message) => dispatch => {
  if (!channelId || !message) { return }
  dispatch(send({
    type: 'chat_message',
    channel_id: channelId,
    message: message
  }))
}
export const handleMakeIntroduction = (recipient, introducee) => dispatch => {
  dispatch({
    types: [types.INTRODUCTION_REQUEST, types.INTRODUCTION_SUCCESS, types.INTRODUCTION_FAILURE],
    url: `/introductions/`,
    method: 'post',
    data: {recipient: recipient.value, introducee: introducee.value},
    callback: handleSetSelectedMembers([recipient, introducee])
  })
}
export const handleSetSelectedMembers = (members) => dispatch  => {
  return dispatch({ type: types.SET_SELECTED_MEMBERS, data: members || [] })
}
export const handleSetSelectedChannel = (email, channel) => dispatch => {
  dispatch({ type: types.SET_SELECTED_CHANNEL, data: channel || null })
  if (channel) {
    return dispatch(handleGetChannelDetail(email, channel))
  } else {
    return dispatch({ type: types.CHANNEL_DETAIL_SUCCESS, data: null })
  }
}
export const handleGetChannelDetail = (email, channel) => dispatch => {
  if (!email || !channel || !channel.id) {
    return dispatch({ type: types.CHANNEL_DETAIL_SUCCESS, data: null })
  }
  dispatch({
    types: [types.CHANNEL_DETAIL_REQUEST, types.CHANNEL_DETAIL_SUCCESS, types.CHANNEL_DETAIL_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/chats/${channel.id}`,
    callback: handleMarkMessageSeen(email, channel)
  })
}
const handleMarkMessageSeen = (email, channel) => dispatch => {
  dispatch({
    types: [types.CHANNEL_SEEN_REQUEST, types.CHANNEL_SEEN_SUCCESS, types.CHANNEL_SEEN_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/chats`,
    method: 'patch',
    data: { unhide_channels: [channel.id], seen: [{channel_id: channel.id, message_id: channel.last_message ? channel.last_message.id : 0 }] },
    callback: handleGetMessageChannels(email)
  })
}
export const handleMarkLogsRead = (email, logIds) => dispatch => {
  if (!email) { return }
  dispatch({
    types: [types.MARK_READ_REQUEST, types.MARK_READ_SUCCESS, types.MARK_READ_FAILURE],
    url: `/notifications/${encodeURIComponent(email)}/logs`,
    method: 'patch',
    data: { read: logIds },
    callback: handleGetNotificationLogs(email)
  })
}
export const handleSetMessageIndicator = (values) => {
  return { type: types.MESSAGE_INDICATOR, data: values || [] }
}
export const handleGetNotificationSettings = (user) => async (dispatch) => {
  if (!user || !user.email || !user.role || user.default_profile === 'applicant') { return  { type: types.SETTINGS_FAILURE, error: 'Invalid User' } }
  dispatch({
    types: [types.SETTINGS_REQUEST, types.SETTINGS_GET_SUCCESS, types.SETTINGS_FAILURE],
    url: `/profiles/${encodeURIComponent(user.email)}/notification_settings`,
  })
}
export const handleUpdateNotificationSettings = (user, setting) => dispatch => {
  dispatch({
    types: [types.SETTINGS_REQUEST, types.SETTINGS_UPDATE_SUCCESS, types.SETTINGS_FAILURE],
    url: `/profiles/${encodeURIComponent(user.email)}/notification_settings`,
    method: 'put',
    data: { ...setting },
    callback: handleGetNotificationSettings(user)
  })
}

const flattenReferences = (data) => {
  let obj = {}
  data.forEach(item => {
    obj[item.notification_type] = {
      email: item.email,
      online: item.online,
      text: item.text
    }
  })
  return obj
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.SETTINGS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notification_settings: flattenReferences(action.data)
      }
    case types.SETTINGS_FAILURE:
    case types.LOGS_FAILURE:
    case types.GET_CHANNELS_FAILURE:
    case types.CREATE_CHANNELS_FAILURE:
    case types.CHANNEL_DETAIL_FAILURE:
    case types.HIDE_CHANNEL_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    case types.SETTINGS_REQUEST:
    case types.LOGS_REQUEST:
    case types.GET_CHANNELS_REQUEST:
    case types.CREATE_CHANNELS_REQUEST:
    case types.CHANNEL_DETAIL_REQUEST:
    case types.HIDE_CHANNEL_REQUEST:
      return { ...state, isLoading: true }
    case types.LOGS_SUCCESS:
      return { ...state, isLoading: false, logs: action.data }
    case types.HIDE_CHANNEL_SUCCESS:
        return { ...state, isLoading: false }
    case types.CREATE_CHANNELS_SUCCESS:
      return { ...state, isLoading: false, selectedChannel: { id: action.data.channel_id } }
    case types.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        channels: action.data,
        messageIndicator: action.data.filter(x => (x.status && !x.status.last_seen) || (x.last_message && x.last_message.id && x.status.last_seen && x.last_message.id > x.status.last_seen)).map(y => y.id)
      }
    case types.CHANNEL_DETAIL_SUCCESS:
      return { ...state, isLoading: false, channelDetail: action.data }
    case types.MESSAGE_INDICATOR:
      return { ...state, messageIndicator: action.data || [] }
    case types.INTRODUCTION_SUCCESS:
    case types.INITIAL_MESSAGE:
      return { ...state, initialChatMessage: action.data }
    case types.SET_SELECTED_CHANNEL:
      return { ...state, selectedChannel: action.data }
    case types.SET_SELECTED_MEMBERS:
      return { ...state, selectedMembers: action.data }
    // case 'REDUX_WEBSOCKET::OPEN':
    //   console.log('Socket Opened', action)
    //   return state
    // case 'REDUX_WEBSOCKET::CLOSED':
    //   console.log('Socket Closed', action.meta)
    //   return state
    case 'REDUX_WEBSOCKET::SEND':
      try {
        if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG_MODE === 'true') {
          console.warn('SENT SOCKET MESSAGE: ', action.payload)
        }
        switch (action.payload.type) {
          case 'chat_message':
            return { ...state, initialChatMessage: '' }
          default:
            return state
        }
      } catch (error) {
        console.error('Socket Message Error', error)
        return state
      }    
    case 'REDUX_WEBSOCKET::MESSAGE':
      try {
        if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG_MODE === 'true') {
          const newMessage = JSON.parse(action.payload.message)
          console.warn('RECEIVED SOCKET MESSAGE: ', newMessage)
        }
        return state
      } catch (error) {
        console.error('Socket Message Error', error)
        return state
      }
    // case 'REDUX_WEBSOCKET::ERROR':
    //   console.log('Socket Error', action)
    //   return state
    default:
      return state
  }
}
