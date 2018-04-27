import React, {Component} from 'react';
import Footer from '../components/Footer.jsx'
import API from '../src/API'
import Order from '../components/Order.jsx'

class Orders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }

    this.api = new API()
    this.fetchOrders()
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  fetchOrders() {
    this.api.fetchOrders()
    .then(orders => this.setState({orders: orders.filter(o => o.status !== 'OPEN')}))
  }

  render() {
    return (
      <div>
        <div id="home-sec" className="container" style={{marginTop: 70, maxWidth: 1000}}>
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.state.orders.map((o, i) => <Order base={o} key={i}/>)}
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Orders
