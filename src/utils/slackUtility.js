import axios from "axios";

export var SlackUtility = {
    // posts message to slack channel
    hook: 'https://hooks.slack.com/services/THoa',
    messageBot: (msg) => {
        if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
            console.log('\nSLACK MESSAGE\n\n' + msg)
            return
        }
        axios.post(SlackUtility.hook, JSON.stringify({ text: msg }), {
            withCredentials: false,
            transformRequest: [(data, headers) => {
              delete headers.post["Content-Type"]
              return data
            }]
        }).then((response) => {
            // console.log('Hook REsponse', response.data)
        }).catch((err) => {
            console.warn('Slack Error: ' + err) 
        })
    },
    unhandledNotification: (notification) => {
        let msg = 'Unhandled Notification\n'
        msg = msg + notification.type + '\n'
        msg = msg + notification.email
        SlackUtility.messageBot(msg)
    }
}