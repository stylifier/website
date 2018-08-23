import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router-dom'
import API from '../API'

class ProductManeger extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    const args = {}
    this.props.location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    const parts = this.props.location.pathname.split('/')

    this.state = {
      id: parts[parts.length - 1],
      colorPallet: args.color_pallet ? decodeURIComponent(args.color_pallet) : null,
      action: args.action ? decodeURIComponent(args.action) : null,
      message: 'Please wait...',
      base: {}
    }
  }

  componentDidMount() {
    const {id, colorPallet} = this.state
    this.api.getProductById(id)
    .then((p) => {
      this.setState({base: p})
      return this.api.createProduct(Object.assign(p, {colorPallet, shopAddress: {id: p.shopAddressId}}))
    })
    .then(() => {
      this.setState({message: 'done!'})
      window.close()
    })
    .catch((e) => {
      this.setState({message: 'failed, ' + e.message})
    })
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <div id="home-sec" className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.state.message}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductManeger.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ProductManeger)
