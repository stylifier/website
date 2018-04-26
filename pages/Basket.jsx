import React, {Component} from 'react';
import Footer from '../components/Footer.jsx'
import OpenOrder from '../components/OpenOrder.jsx'

class Basket extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  fetchOrders() {
    this.api.fetchOpenOrders()
    .then(orders => this.setState({orders}))
  }

  render() {
    return (
      <div>
        <div id="home-sec" className="container">
          <div className="row clr-white" >
            <div className="col-lg-2 col-md-1 col-sm-0 col-xs-0"/>
            <div className="col-lg-8 col-md-10 col-sm-12 col-xs-12" style={{paddingTop: 50}}>
              <OpenOrder />
            </div>
            <div className="col-lg-2 col-md-1 col-sm-0 col-xs-0"/>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Basket
