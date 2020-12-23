import axios from 'axios';
import { handleLogout } from './reducers/users';

const API_ROOT = process.env.REACT_APP_BASE_URL;

// export const socketMiddleware = store => next => action => {
//     const { auth: { session = {} } } = store.getState();
//     const token = session && session.token ? session.token : null
//     try {
//         if (action && action.type === 'REDUX_WEBSOCKET::OPEN') {
//             next(action)
//             store.dispatch(send({ type: 'authorization', data: token }))
//             return
//         } else {
//             next(action)
//         }        
//     } catch (error) {
//         console.log('Socket Middleware error', action, error)
//         next(action)
//     }
// };
// export const chatMiddleware = store => next => action => {
//     try {
//         if (action && action.type === 'REDUX_WEBSOCKET::MESSAGE') {
//             const newMessage = JSON.parse(action.payload.message)
//             const { auth: { session = {} } } = store.getState();
//             const email = session && session.email ? session.email : null
//             const { groups: { groupDetail = {} } } = store.getState()
//             switch (newMessage.type) {
//                 case 'chat_message':
//                     store.dispatch(handleGetMessageChannels(email))
//                     // if channelDetail, refresh channel detail with new last message
//                     const { notifications: { channelDetail = {} } } = store.getState()
//                     if (channelDetail && channelDetail.id && newMessage.data.channel_id === channelDetail.id) {
//                         store.dispatch(handleGetChannelDetail(email, { id: channelDetail.id, last_message: { id: newMessage.data.id }}))
//                     }
//                     break
//                 case 'tagged_in_post':
//                     store.dispatch(handleGetPosts(groupDetail && groupDetail.id ? groupDetail.id : null))
//                     store.dispatch(handleGetNotificationLogs(email))
//                     break
//                 case 'we_have_played_together':
//                     store.dispatch(handleGetMembers())
//                     store.dispatch(handleGetNotificationLogs(email))
//                     break
//                 case 'new_group_member':
//                 case 'group_invite':
//                     store.dispatch(handleGetGroups())  
//                     store.dispatch(handleGetNotificationLogs(email))
//                     break
//                 case 'play_golf':
//                     store.dispatch(handleGetPosts(groupDetail && groupDetail.id ? groupDetail.id : null))
//                     store.dispatch(handleGetNotificationLogs(email))
//                     break
//                 default:
//                     break
//             }
//             next(action)
//             return
//         }
//         if (action && action.type === notificationTypes.CREATE_CHANNELS_SUCCESS) {
//             next(action)
//             const { notifications } = store.getState()
//             if (action.data.channel_id) {
//                 store.dispatch(send({
//                     type: 'chat_message',
//                     channel_id: action.data.channel_id,
//                     message: notifications.initialChatMessage
//                 }))
//             }
//             return
//         }
//         next(action)        
//     } catch (error) {
//         console.log('Chat Middleware error', action, error)
//         next(action)
//     }
// };

export const tokenMiddleware = store => next => action => {
    const { users: { session = {} } } = store.getState();
    const token = session && session.token ? session.token : null
    if (typeof action.types === 'undefined' || typeof action.url === 'undefined') return next(action);
    const [pendingType, successType, errorType] = action.types;
    const contentType = action.contentType || 'application/json'
    let config = {
        baseURL: API_ROOT,
        url: action.url,
        method: action.method || 'get',
        data: action.data || {},
        params: action.query || {},
        timeout: action.timeout || 3000,
        headers: { 'Content-Type': contentType }
    }
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG_MODE === 'true') {
        console.log('ACTION', action)
        console.log('CONFIG', config)
    }
    if (token) { config.headers['Authorization'] = token }
    axios(config).then(async (response) => {
        next({
            type: successType,
            data: response.data
        });
        if (action.callback) { store.dispatch(action.callback) }
        return;
    }).catch(error => {
        console.log('Token Middleware error', action, error)
        if (!action.blockLogout && token && error.response && error.response.status === 401) {
            return store.dispatch(handleLogout());
        }
        let msg = error && error.response && error.response.data ? (error.response.data.msg || 'Unknown') : error.message
        if (msg.startsWith('timeout')) {
            msg = 'The network connection has timed out.  Please try again later.'
        }
        next({
            type: errorType,
            code: error && error.response && error.response.data ? error.response.data.code || 'UNKNOWN'  : 'UNKNOWN',
            error: msg
        });
        if (action.errorAction) { store.dispatch(action.errorAction)}
        return;
    })
    // Dispatch the pending action
    if (pendingType) {
        next({ type: pendingType });
    }
};
