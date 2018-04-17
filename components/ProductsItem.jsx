import React, {Component, PropTypes} from 'react';
require('../styles/feed.scss')

class ProductsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      currentUser: JSON.parse(localStorage.getItem('user_info'))
    }
  }

  refreshStats() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize(){
    this.render()
  }

  render() {
    const {base, onLoaded} = this.props
    const {loaded} = this.state
    const img = base.media.images.standard_resolution.url

    return (
      <div
        className="containerItem"
        style={{visibility: loaded ? 'visible' : 'hidden'}}>
        <img src={img} style={{width: '100%', borderRadius: 4, marginBottom: 5}} onLoad={() => this.setState({loaded: true}) && onLoaded()}/>
        <div style={{float: 'left', position: 'relative'}}>
          <div className="text" style={{
            top: 0,
            left: 0,
            position: 'absolute',
            backgroundColor: '#5F9EA0',
            padding: 4,
            borderRadius: 4,
            color: 'white',
            minWidth: '250'
          }}>
            <table style={{width: '100%', color: 'white'}}>
              <tr>
                <td>Product:</td>
                <td style={{float: 'right'}}>{base.name && base.name}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td style={{float: 'right'}}>{base.price && base.price.toFixed(2)}	&euro;</td>
              </tr>
            </table>
          </div>
        </div>
        {this.state.currentUser.username.toLowerCase() !== base.userUsername.toLowerCase() && <div style={{position: 'relative'}}>
          <a className="btn shadowed" onClick={() => this.api.setProfilePicture(base).then(() => window.location.reload())} style={{position: 'absolute', bottom: 0, right: 0, color: 'white', margin: 10, marginRight: 5, backgroundColor: 'blue', borderRadius: 4}}>
            Add to Your Cart
          </a>
        </div>}
      </div>
    )
  }
}

ProductsItem.propTypes = {
  base: PropTypes.object,
  showApproval: PropTypes.bool,
  onLoaded: PropTypes.func
}

export default ProductsItem
