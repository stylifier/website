import request from 'superagent'
import Promise from 'bluebird'

class API {
  constructor() {
    this.baseAddress = 'http://localhost:3000'
    this.token = localStorage.getItem('user_token')
    this.userInfo = JSON.parse(localStorage.getItem('user_info')) || {}
  }

  setToken(token) {
    localStorage.setItem('user_token', token)
    this.token = token
  }

  get(path, params, extraHeaders) {
    extraHeaders = extraHeaders || {}
    const paramsStr = params && params.length > 0 ? '?' + params.join('&') : ''
    return new Promise((accept, reject) => {
      request
      .get(this.baseAddress + path + paramsStr)
      .set(Object.assign({
        accept: 'json',
        Authorization: 'Bearer '+ this.token,
        'x-consumer-username': this.userInfo.username
      }, extraHeaders))
      .end((error, res) => {
        if(error)
          return reject(error)

        accept(res.body)
      })
    })
  }

  delete(path, extraHeaders) {
    extraHeaders = extraHeaders || {}
    return new Promise((accept, reject) => {
      request
      .delete(this.baseAddress + path)
      .set(Object.assign({
        accept: 'json',
        Authorization: 'Bearer '+ this.token,
        'x-consumer-username': this.userInfo.username
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
        Authorization: 'Bearer '+ this.token,
        'x-consumer-username': this.userInfo.username
      })
      .end((error, res) => {
        if(error)
          return reject(error)

        return resolve(res.body)
      })
    })
  }

  put(path, body) {
    return new Promise((resolve, reject) => {
      request
      .put(this.baseAddress + path)
      .send(Object.assign({}, body))
      .set({
        accept: 'json',
        Authorization: 'Bearer '+ this.token,
        'x-consumer-username': this.userInfo.username
      })
      .end((error, res) => {
        if(error)
          return reject(error)

        return resolve(res.body)
      })
    })
  }

  login(info) {
    this.userInfo.username = info.username
    return this.post('/login', info)
    .then((res) => {
      if(!res.jwt)
        return Promise.reject(new Error('could not fetch token from api'))
      return res.jwt
    })
  }

  register(info) {
    this.userInfo.username = info.username
    return this.post('/register', info)
    .then((res) => {
      if(!res.jwt)
        return Promise.reject(new Error('could not fetch token from api'))
      return res.jwt
    })
  }

  fetchBrands(q, pagination) {
    return this.get('/brands', ['q=' + encodeURIComponent(q), ...(pagination ? ['pagination=' + pagination] : [])])
  }

  fetchUsers(q, pagination) {
    return this.get('/users', ['q=' + encodeURIComponent(q), ...(pagination ? ['pagination=' + pagination] : [])])
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

  closeThread(threadId, reviewObj) {
    return this.post(`/threads/${threadId}/close`, reviewObj)
  }

  followUser(username) {
    return this.post(`/users/${username}/follow`, {})
  }

  createThread(toUsername) {
    return this.post('/threads', {to: {username: toUsername}})
  }

  createMessage(threadId, text, media) {
    return this.put(`/threads/${threadId}/messages`, {text: text, media: media})
  }

  fetchUserFollowers(username, pagination, quary) {
    return this.get(`/users/${username}/followers`,
      [
        ...(quary ? ['q=' + quary] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ])
  }

  fetchUserMedia(username, pagination) {
    return this.get(`/users/${username}/media`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchThreads(q, pagination) {
    return this.get('/threads', ['q=' + encodeURIComponent(q), ...(pagination ? ['pagination=' + pagination] : [])])
  }

  fetchMessages(threadId, pagination) {
    return this.get(`/threads/${threadId}/messages`, pagination ? ['pagination=' + pagination] : [])
  }

  addSubsctiption(id) {
    return this.post(`/subscriptions/${id}`, {})
  }

  removeSubsctiption(id) {
    return this.delete(`/subscriptions/${id}`, {})
  }
}

export default API
