import API from '../API'

const api = new API()
const userInfo = JSON.parse(localStorage.getItem('user_info')) || {}

export default () => next => action => {
  const callAPI = action.callApi

  if (!callAPI) {return next(action)}

  switch (action.type) {
    case 'INIT_BASKET':
      api.fetchOrders()
      .then(orders =>
        orders
        .filter(o => o.status === 'OPEN' && o.user.username === userInfo.username)
        .reduce((a, b) => {b.items.forEach(i => a.push(i));return a;}, []))
      .then(orders => next(Object.assign({}, action, {payload: orders})))
      break;

    case 'REMOVE_FROM_BASKET':
      api.deleteOrderItem(action.payload)
      .then(() => next(action))
      break;

    default:
      return next(action)
  }
}
