import React, {Component, PropTypes} from 'react'
import ProductsItem from './ProductsItem.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'
import Promise from 'bluebird'

class ProductsViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {
      pagination: 0,
      viewerKey: Math.random() * 1000,
      color: '',
      category: '',
      hex: ''
    }
  }

  fetchProducts() {
    const {pagination} = this.state

    if(pagination === '')
      return Promise.resolve([])

    return this.api.fetchSelfProducts({
      color: this.state.color || undefined,
      hex: this.state.hex || undefined,
      category: this.state.category || undefined
    }, pagination)
    .then((res) => {
      this.setState({pagination: res.pagination})
      return res.data
    })
  }

  changeFilter(obj) {
    this.setState(obj)

    if(this.filterChangesTimeout)
      clearTimeout(this.filterChangesTimeout)

    this.filterChangesTimeout = setTimeout(() => this.setState({viewerKey: Math.random() * 1000, pagination: 0}), 300)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.color}
          onChange={e => this.changeFilter({color: e.target.value})}
          className="form-control" placeholder="Color filter"/>
        <input
          type="text"
          value={this.state.category}
          onChange={e => this.changeFilter({category: e.target.value})}
          className="form-control" placeholder="Category filter"/>
        <input
          type="text"
          value={this.state.hex}
          onChange={e => this.changeFilter({hex: e.target.value})}
          className="form-control" placeholder="Hex filter"/>
        <Viewer
          key={this.state.viewerKey}
          largeRowCount={3.1}
          mediomRowCount={2.1}
          smallRowCount={1}
          ItemView={ProductsItem}
          fetcher={() => this.fetchProducts()}
          ItemViewProps={{
            showApproval: this.props.showApproval,
            showColorChange: true
          }}/>
      </div>
    )
  }
}

ProductsViewer.propTypes = {
  showApproval: PropTypes.bool
}

export default ProductsViewer
