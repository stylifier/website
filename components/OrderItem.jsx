import React, {Component, PropTypes} from 'react';
import ProductsItem from './ProductsItem.jsx'

class OrderItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {base, onRemoveClicked} = this.props

    return (
      <div className="container">
        <div className="row clr-white" >
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-3" style={{padding: 0}}>
            <ProductsItem styleOverwrite={{padding: 0, minWidth: '100%', paddingBottom: 10, borderRadius: 5}} hideOrder={true} base={base.product}/>
          </div>
          <div className="col-lg-10 col-md-8 col-sm-8 col-xs-6">
            <h4 style={{color: 'black', marginTop: 0, paddingTop: 0}}> {base.product.name} </h4>
            <h5 style={{color: '#595959'}}> Code: {base.product.code} </h5>
            <h5 style={{color: '#595959'}}> Provided By: {base.product.userUsername} </h5>
            <h5 > <a style={{color: 'red'}} href="#" onClick={e => {
              e.preventDefault()
              onRemoveClicked && onRemoveClicked(base)
            }}> remove </a> </h5>
          </div>
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-3">
            {base.product.price && base.product.price.toFixed(2)}	&euro;
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

OrderItem.propTypes = {
  base: PropTypes.object,
  onRemoveClicked: PropTypes.func
}

export default OrderItem
