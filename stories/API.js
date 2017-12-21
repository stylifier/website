import request from 'superagent'
import Promise from 'bluebird'

class API {
  constructor() {
    this.baseAddress = 'https://mock.stylifier.com'
  }

  login(username, password) {
    return new Promise((accept, reject) => {
      request
      .post(this.baseAddress + '/login')
      .send(Object.assign({}, {username: username, password: password }))
      .set('accept', 'json')
      .end((error, res) => {
        if(error)
          return reject(error)

        if(!res.body.jwt)
          return reject(new Error('could not fetch token from api'))

        accept(res.body.jwt)
      })
    })
  }

  register(info) {
    return new Promise((accept, reject) => {
      const fn = info.fullname.trim()
      const lastName = fn.split(' ').length > 1 ? fn.split(' ')[fn.split(' ').length - 1] : ''
      const firstName = fn.split(' ').length > 1 ? fn.split(' ').slice(0, fn.split(' ').length - 1).join(' ') : fn

      request
      .post(this.baseAddress + '/register')
      .send(Object.assign({}, {
        username: info.username,
        password: info.password,
        lastName: lastName,
        firstName: firstName,
        email: info.email
      }))
      .set('accept', 'json')
      .end((error) => {
        if(error)
          return reject(error)

        accept()
      })
    })
  }
}

export default API
