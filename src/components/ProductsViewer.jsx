import React, {Component, PropTypes} from 'react'
import ProductsItem from './ProductsItem.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'

class ProductsViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {
      products: []
    }
    this.fetchProducts()
  }

  fetchProducts() {
    return this.api.fetchSelfProducts()
        .then((res) => this.setState({products: res}))
  }

  render() {
    return (
      <Viewer
        largeRowCount={3.1}
        mediomRowCount={2.1}
        smallRowCount={1}
        ItemView={ProductsItem}
        dommy={true}
        baseItems={[...this.state.products]}
        ItemViewProps={{showApproval: this.props.showApproval}}/>
    )
  }
}

ProductsViewer.propTypes = {
  showApproval: PropTypes.bool
}

export default ProductsViewer
