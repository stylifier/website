import React, {Component, PropTypes} from 'react';
import OrderItem from './OrderItem.jsx'
import ucfirst from 'ucfirst'
import moment from 'moment'
import API from '../API'

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {},
      base: Object.assign({}, this.props.base)
    }
    this.api = new API()
  }

  setOrderStatus(e, status) {
    const {base} = this.state

    e.preventDefault()
    this.api.setOrderStatus(base.id ,status)
    .then(() => this.api.fetchOrders())
    .then(orders => this.setState({base: orders.filter(o => o.id === base.id)[0]}))
  }

  renderActionButtons() {
    const {base} = this.state

    if(base.status === 'ORDERED')
      return (<p style={{textAlign: 'right', float: 'right'}} className='btn-group' role="group">
        <a role="button" href="#" style={{textAlign: 'center'}} className="btn btn-primary" onClick={(e) => this.setOrderStatus(e, 'READY_TO_PICK_UP')}>Ready to pickup</a>
        <a href='#' className="btn btn-danger" style={{textAlign: 'center'}} onClick={(e) => this.setOrderStatus(e, 'REJECTED')}>Reject</a>
      </p>)
  }

  render() {
    const {base} = this.state
    const h5Style = {color: 'black', marginTop: 0, paddingTop: 0}
    const isMyOrder = this.state.userInfo.username !== base.user.username

    return (
      <div style={{
        border: '1px solid darkgray',
        borderRadius: '7px',
        padding: 20,
        margin: 20
      }}>
        {isMyOrder && this.renderActionButtons()}
        <h5 style={h5Style}> Status: {ucfirst(base.status.toLowerCase().replace(/_/g, ' '))} </h5>
        {isMyOrder && <h5 style={h5Style}> Ordered by: <a href={`/profile/${base.user.username}`}>{base.user.username}</a> </h5>}
        <h5 style={h5Style}> Created {moment(base.createdAt).fromNow()} </h5>
        {base.items.map((o, i) => (
          <OrderItem base={o} key={i} onRemoveClicked={(item) => this.api.deleteOrderItem(item).then(() => this.fetchOrders())}/>
        ))}
        <h5 style={{textAlign: 'right', marginRight: 30}}> Total Price: {Math.round(base.items.map(t => t.product).reduce((a, b) => a + b.price, 0) * 100) / 100} &euro;</h5>
        <h5 style={Object.assign({},h5Style, {textAlign: 'right', marginRight: 30})}> Updated {moment(base.updatedAt).fromNow()} </h5>
      </div>
    )
  }
}

Order.propTypes = {
  base: PropTypes.object
}

export default Order
