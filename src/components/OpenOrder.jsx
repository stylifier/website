import React, {Component} from 'react';
import OrderItem from './OrderItem.jsx'
import AddressManager from '../components/AddressManager.jsx'
import { withRouter } from 'react-router-dom'
import Promise from 'bluebird'
import API from '../API'

class OpenOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }

    this.api = new API()
    this.fetchOrders()
  }

  fetchOrders() {
    this.api.fetchOpenOrders()
    .then(orders => this.setState({orders}))
  }

  closeOrder(e) {
    const {orders} = this.state
    e.preventDefault()
    Promise.all(orders.map(order =>
      this.api.closeOrder(order.id, this.addressManager.getSelectedAddress())))
    .then(() => this.props.history.push('/orders'))
  }

  render() {
    const reducedOrders = this.state.orders.reduce((a, b) => {
      b.items.forEach(i => a.push(i));
      return a}
    , [])

    return (
      <div>
        {reducedOrders.map((o, i) => (
          <OrderItem base={o} key={i} showRemoveButton={true} onRemoveClicked={(item) => this.api.deleteOrderItem(item).then(() => this.fetchOrders())}/>
        ))}
        <div className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginBottom: 20, marginTop: 20}}>
              <h4> Delivery Address: </h4>
              <AddressManager ref={ref => this.addressManager = ref}/>
              <hr/>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right', marginBottom: 20, marginTop: 20}}>
              <h5> Total Price: {reducedOrders.map(t => t.product).reduce((a, b) => a + b.price, 0)} &euro;</h5>
              <button style={{marginTop: 10}} type="submit" className="btn btn-primary" onClick={(e) => this.closeOrder(e)}>Process Requests</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OpenOrder.propTypes = {
  history: React.PropTypes.shape({push: React.PropTypes.func.isRequired}).isRequired
}

export default withRouter(OpenOrder)
