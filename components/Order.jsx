import React, {Component, PropTypes} from 'react';
import OrderItem from './OrderItem.jsx'

class Order extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {base} = this.props

    return (
      <div style={{
        border: '1px solid darkgray',
        borderRadius: '7px',
        padding: 20,
        margin: 20
      }}>
        {base.items.map((o, i) => (
          <OrderItem base={o} key={i} onRemoveClicked={(item) => this.api.deleteOrderItem(item).then(() => this.fetchOrders())}/>
        ))}
        <h5 style={{textAlign: 'right', marginRight: 30}}> Total Price: {base.items.map(t => t.product).reduce((a, b) => a + b.price, 0)} &euro;</h5>
      </div>
    )
  }
}

Order.propTypes = {
  base: PropTypes.object
}

export default Order
