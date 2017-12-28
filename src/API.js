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
    const paramsStr = params ? '?' + params.join('&') : ''
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
    const fn = info.fullname.trim()
    const lastName = fn.split(' ').length > 1 ? fn.split(' ')[fn.split(' ').length - 1] : ''
    const firstName = fn.split(' ').length > 1 ? fn.split(' ').slice(0, fn.split(' ').length - 1).join(' ') : fn

    return this.post('/register', {
      username: info.username,
      password: info.password,
      lastName: lastName,
      firstName: firstName,
      email: info.email
    })
  }

  fetchFeeds(from) {
    return this.get('/feeds', ['from=' + from])
  }

  fetchUserInfo() {
    return this.get('/user-info')
  }

  fetchUser(username) {
    return this.get('/users/' + username)
  }

  fetchUserImages(username, from) {
    return this.get(`/users/${username}/images`, ['from=' + from])
  }
}

export default API
