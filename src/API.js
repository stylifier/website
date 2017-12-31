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

  fetchBrands(q, from) {
    return this.get(`/brands?q=${encodeURIComponent(q)}`, from ? ['from=' + from] : [])
  }

  fetchUsers(q, from) {
    return this.get(`/users?q=${encodeURIComponent(q)}`, from ? ['from=' + from] : [])
  }

  fetchFeeds(from) {
    return this.get('/feeds', from ? ['from=' + from] : [])
  }

  fetchUserInfo() {
    return this.get('/user-info')
  }

  fetchUser(username) {
    return this.get('/users/' + username)
  }

  fetchUserImages(username, from) {
    return this.get(`/users/${username}/images`, from ? ['from=' + from] : [])
  }

  fetchThreads(q, from, to) {
    return Promise.resolve([{
      "id": "9210dce8-25da-4275-a73a-1383b9774255",
      "status": "OPEN",
      "createdAt": "2017-12-26T18:54:24.921Z",
      "from": {
        "username": "MockUser",
        "firstName": "mock",
        "lastName": "user",
        "followersCount": 1,
        "createdAt": "2017-12-26T18:54:24.921Z",
        "story": "Praesent mauris.",
        "avatar": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg",
        "rating": 4,
        "styles": ["formal"],
        "sponsors": {
          "name": "acme",
          "image": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg"
        }
      },
      "to": {
        "username": "anna",
        "firstName": "anna",
        "lastName": "smith",
        "followersCount": 1,
        "createdAt": "2017-12-26T18:54:24.921Z",
        "story": "Praesent",
        "avatar": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg",
        "rating": 4,
        "styles": ["formal"],
        "sponsors": []
      },
      assets: [{
        "id": "d42e0091-2c67-437b-987c-296661c0dc3e",
        "createdAt": "2017-12-26T15:54:24.921Z",
        "threadId": "9210dce8-25da-4275-a73a-1383b9774255",
        "isPublic": false,
        "owner": "tim"
      },
      {
        "id": "8e0e5bea-f914-492a-8a2b-011bdbae7ae7",
        "threadId": "9210dce8-25da-4275-a73a-1383b9774255",
        "createdAt": "2017-12-26T18:54:24.921Z",
        "isPublic": false,
        "owner": "anna"
      }]
    },
    {
      "id": "9210dce8-25da-4275-a73a-1383b9774255",
      "status": "OPEN",
      "createdAt": "2017-12-26T18:54:24.921Z",
      "to": {
        "username": "MockUser",
        "firstName": "mock",
        "lastName": "user",
        "followersCount": 1,
        "createdAt": "2017-12-26T18:54:24.921Z",
        "story": "Praesent mauris.",
        "avatar": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg",
        "rating": 4,
        "styles": ["formal"],
        "sponsors": {
          "name": "acme",
          "image": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg"
        }
      },
      "from": {
        "username": "anna",
        "firstName": "anna",
        "lastName": "smith",
        "followersCount": 1,
        "createdAt": "2017-12-26T18:54:24.921Z",
        "story": "Praesent",
        "avatar": "https://mock.stylifier.com/images/9210dce8-25da-4275-a73a-1383b9774253.jpeg",
        "rating": 4,
        "styles": ["formal"],
        "sponsors": []
      },
      assets: [{
        "id": "d42e0091-2c67-437b-987c-296661c0dc3e",
        "createdAt": "2017-12-26T15:54:24.921Z",
        "threadId": "9210dce8-25da-4275-a73a-1383b9774255",
        "isPublic": false,
        "owner": "tim"
      },
      {
        "id": "8e0e5bea-f914-492a-8a2b-011bdbae7ae7",
        "threadId": "9210dce8-25da-4275-a73a-1383b9774255",
        "createdAt": "2017-12-26T18:54:24.921Z",
        "isPublic": false,
        "owner": "anna"
      }]
    }])

    const params = []
    if(from) params.push(from)
    if(to) params.push(to)
    return this.get(`/threads?q=${encodeURIComponent(q)}`, params)
  }

  fetchMessages(threadId, from, to) {
    const params = []
    if(from) params.push(from)
    if(to) params.push(to)
    return this.get(`/threads/${threadId}/messages`, params)
  }
}

export default API
