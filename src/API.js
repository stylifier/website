import request from 'superagent'
import Promise from 'bluebird'

class API {
  constructor() {
    this.baseAddress = 'https://cloud.stylifier.com'
    // this.baseAddress = 'http://localhost:3000'
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

  createMessage(threadId, text, media, products) {
    return this.put(`/threads/${threadId}/messages`, {text: text, media: media, products})
  }

  addMediaToThread(threadId, media) {
    return this.put(`/threads/${threadId}/media`, {media: media})
  }

  fetchUserFollowers(username, pagination, quary) {
    return this.get(`/users/${username}/followers`,
      [
        ...(quary ? ['q=' + quary] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ])
  }

  fetchSelfCampaigns() {
    return this.get('/self_campaigns', [])
  }

  fetchCampaigns() {
    return this.get('/campaigns', [])
  }

  fetchUserMedia(username, pagination) {
    return this.get(`/users/${username}/media`, pagination ? ['pagination=' + pagination] : [])
  }

  fetchThreads(q, pagination) {
    return this.get('/threads', [ ...(q ? ['q=' + encodeURIComponent(q)] : []), ...(pagination ? ['pagination=' + pagination] : [])])
  }

  fetchMessages(threadId, pagination) {
    return this.get(`/threads/${threadId}/messages`, pagination ? ['pagination=' + pagination] : [])
  }

  addSubsctiption(id, name) {
    if(!id) return Promise.resolve()
    return this.post(`/subscriptions/${id}?name=${name}`, {})
  }

  shareMedia(id) {
    return this.post(`/media/${id}/share`, {})
  }

  addDescriptionToMedia(id, description) {
    return this.post(`/media/${id}/description`, {description})
  }

  removeSubsctiption(id) {
    return this.delete(`/subscriptions/${id}`, {})
  }

  fetchUserSponsoredBy(username, pagination, quary) {
    return this.get(`/users/${username}/sponsored_by`,
      [
        ...(quary ? ['q=' + quary] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ])
  }

  fetchUserSponsors(username, pagination, quary) {
    return this.get(`/users/${username}/sponsors`,
      [
        ...(quary ? ['q=' + quary] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ])
  }

  sponsorUser(username, accept) {
    return this.post(`/users/${username}/sponsor`, accept ? {accept: true} : {})
  }

  setStyle(mediaId, style) {
    if(!mediaId || !style) return Promise.resolve()
    return this.post(`/media/${mediaId}/style/${style}`, {})
  }

  getStyles(q) {
    return this.get('/styles', [ ...(q ? ['q=' + encodeURIComponent(q)] : [])])
  }

  getUserStyles(user, q) {
    return this.get(`/users/${user}/styles`, [ ...(q ? ['q=' + encodeURIComponent(q)] : [])])
  }

  searchMedia(q, pagination) {
    return this.get('/media',
      [
        ...(q ? ['q=' + q] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ])
  }

  createCampaign(media, shopAddress, description) {
    return this.post('/campaigns', {
      media, shopAddress, description
    })
  }

  createProduct(product) {
    return this.post('/products', product)
  }

  fetchSelfProducts(q, pagination) {
    if(!q)
      q = {}

    return this.get('/self_products',
      [
        ...(q.name ? ['name=' + q.name] : []),
        ...(q.color ? ['color=' + q.color] : []),
        ...(q.subColor ? ['sub_color=' + q.subColor] : []),
        ...(q.category ? ['category=' + q.category] : []),
        ...(q.hex ? ['hex=' + q.hex.replace('#', '%23')] : []),
        ...(pagination ? ['pagination=' + pagination] : [])
      ]
    )
  }

  setProfilePicture(media) {
    Object.keys(media).forEach((key) => (media[key] == null) && delete media[key]);
    return this.post('/user/self/profile_picture', Object.assign({}, media))
  }

  getUserAddresses() {
    return this.get('/addresses', [])
    .then(t => t.reverse())
  }

  createAddress(address) {
    return this.post('/addresses', Object.assign({}, address))
  }

  deleteAddress(id) {
    return this.delete('/addresses/' + id, {})
  }

  addOrder(product) {
    delete product.media
    return this.put('/orders', Object.assign({}, product))
  }

  fetchOpenOrders() {
    return this.get('/orders', ['status=OPEN'])
    .then(t => t.reverse())
  }

  fetchColorPalletRecommendation(base) {
    return this.get('/color_pallets', ['color_code=%23' + base])
  }

  fetchOrders() {
    return this.get('/orders')
    .then(t => t.reverse())
  }

  bookmarkColorPallet(palletId, title) {
    return this.post(`/color_pallets/${palletId}${title ? '?title=' + title : ''}`, {})
  }

  deleteBookmarkedColorPallet(palletId) {
    return this.delete(`/color_pallets/${palletId}`, {})
  }

  getProductById(id) {
    return this.get('/product/' + parseInt(id))
  }

  fetchAllColorPallets() {
    return this.get('/all_color_pallets?min_popularity=1&max_popularity=1.3')
  }

  deleteOrderItem(item) {
    return this.delete('/order-item/' + item.id, {})
  }

  closeOrders(orders, address, paymentToken) {
    const add = Object.assign({}, address)
    add.postalCode = parseInt(add.postalCode, 10)
    add.id = add.id.toString()
    return this.post('/orders/close', {orders, address: add, payment_token: paymentToken})
  }

  setOrderStatus(orderId, status) {
    return this.post(`/orders/${orderId}/status/${status}`, {})
  }

  addColorCode(code, name) {
    return this.post('/color_codes', {code, name})
  }

  askForApproval() {
    return this.post('/user/self/request_approval', {})
  }

  approveUser(username) {
    return this.post(`/users/${username}/approve`, {})
  }
}

export default API
