/* global localStorage, sessionStorage */

export var sessionSaver = {
  setSessionAuthentication: function (authObj, rememberMe) {
    sessionStorage.authObj = JSON.stringify(authObj)
    if (rememberMe) {
      localStorage.authObj = JSON.stringify(authObj)
    }
  },
  getSessionAuthentication: function () {
    try {
      let authObj = sessionStorage.authObj
      if (!authObj) { 
        authObj = localStorage.authObj
      }
      return JSON.parse(authObj)
    } catch (e) {
      return null
    }
  },
  logout: function () {
    localStorage.clear()
    sessionStorage.clear()
  }
}
