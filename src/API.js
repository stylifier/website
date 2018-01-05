import request from 'superagent'
import Promise from 'bluebird'

class API {
  constructor() {
    this.baseAddress = 'https://mock.stylifier.com'
    this.userToken = localStorage.getItem('user_token') || ''
  }

  setToken(token) {
    this.userToken = token
  }

  get(path, params, extraHeaders) {
    extraHeaders = extraHeaders || {}
    const paramsStr = params && params.length > 0 ? '?' + params.join('&') : ''
    return new Promise((accept, reject) => {
      request
      .get(this.baseAddress + path + paramsStr)
      .set(Object.assign({
        accept: 'json',
        Authorization: 'Bearer '+ this.userToken
      }, extraHeaders))
      .end((error, res) => {
        if(error)
          return reject(error)

        accept(res.body)
      })
    })
  }

  post(path, body) {
    return new Promise((resolve, reject) => {
      request
      .post(this.baseAddress + path)
      .send(Object.assign({}, body))
      .set({
        accept: 'json',
        Authorization: 'Bearer '+ this.userToken
      })
      .end((error, res) => {
        if(error)
          return reject(error)

        return resolve(res.body)
      })
    })
  }

  login(username, password) {
    return this.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      if(!res.jwt)
        return Promise.reject(new Error('could not fetch token from api'))
      return res.jwt
    })
  }

  register(info) {
    return this.post('/register', info)
    .then((res) => {
      if(!res.jwt)
        return Promise.reject(new Error('could not fetch token from api'))
      return res.jwt
    })
  }

  fetchBrands(q, pagination) {
    return this.get(`/brands?q=${encodeURIComponent(q)}`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchUsers(q, pagination) {
    return this.get(`/users?q=${encodeURIComponent(q)}`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchFeeds(pagination) {
    return this.get('/feeds', pagination ? ['pagination=' + pagination] : [])
  }

  fetchUserInfo() {
    return this.get('/user/self')
  }

  fetchUser(username) {
    return this.get('/users/' + username)
  }

  fetchUserFollowers(username, pagination) {
    return this.get(`/users/${username}/followers`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchUserMedia(username, pagination) {
    return this.get(`/users/${username}/media`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchThreads(q, pagination) {
    return this.get(`/threads?q=${encodeURIComponent(q)}`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchMessages(threadId, pagination) {
    return this.get(`/threads/${threadId}/messages`, pagination ? ['pagination=' + pagination] : [])
  }
}

export default API
