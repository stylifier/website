import React, {Component} from 'react';
import OrderItem from './OrderItem.jsx'
import AddressManager from '../components/AddressManager.jsx'
import {Elements} from 'react-stripe-elements';
import CardPayment from '../components/CardPayment.jsx';
import { withRouter } from 'react-router-dom'
import API from '../API'
import {connect} from 'react-redux'
import actions from '../actions'

const mapStateToProps = (state) => ({
  basket : state.basket
})

const mapDispatchToProps = (dispatch) => ({
  removeFromBasket : (p) =>
    dispatch((actions.removeFromBasket(p)))
})

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
    this.CardPayment.state.stripe.createToken({name: 'Jenny Rosen'})
    .then(({token}) => {
      if(!token) {
        throw new Error('failed to get payment token')
      }
      return this.api.closeOrders(orders, this.addressManager.getSelectedAddress(), token)
    })
    .then(() => this.props.history.push('/orders'))
    .catch(e => console.log(e))
  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginBottom: 20, marginTop: 20}}>
              {this.props.basket.map((o, i) => (
                <OrderItem base={o} key={i} showRemoveButton={true} onRemoveClicked={(item) => this.props.removeFromBasket(item)}/>
              ))}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginBottom: 20, marginTop: 20}}>
              <h4> Delivery Address: </h4>
              <AddressManager ref={ref => this.addressManager = ref}/>
              <hr/>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right', marginBottom: 20, marginTop: 20}}>
              <h5> Total Price: {Math.round(this.props.basket.map(t => t.product).reduce((a, b) => a + b.price, 0) * 100) / 100} &euro;</h5>

              <div className="Checkout" style={{backgroundColor: '#e0eeff', textAlign: 'left', padding: 20, borderRadius: 5, marginTop: 20, marginBottom: 20}}>
                <Elements>
                  <CardPayment ref={ref => this.CardPayment = ref}/>
                </Elements>
              </div>

              <button style={{marginTop: 10}} type="submit" className="btn btn-primary" onClick={(e) => this.closeOrder(e)}>Process Requests</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OpenOrder.propTypes = {
  removeFromBasket: React.PropTypes.func,
  basket: React.PropTypes.array,
  history: React.PropTypes.shape({push: React.PropTypes.func.isRequired}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpenOrder))
