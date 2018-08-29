import React, {Component, PropTypes} from 'react';
import API from '../API'
import {connect} from 'react-redux'
import actions from '../actions'
import ReactCursorPosition from 'react-cursor-position'

const mapStateToProps = (state) => ({
  basket : state.basket
})

const mapDispatchToProps = (dispatch) => ({
  addToBasket : (p) =>
    dispatch((actions.addToBasket(p)))
})

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

require('../styles/feed.scss')

class ProductsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      currentUser: JSON.parse(localStorage.getItem('user_info')),
    }
    this.api = new API()
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
    const {base, onLoaded, hideOrder, addToBasket} = this.props
    const {loaded} = this.state
    const img = base.media[0].standard_resolution.url

    return (
      <ReactCursorPosition
        style={{
          width: '100%'
        }}
        {...{
          onPositionChanged: props => {
            if(!this.pixelData || !this.props.showColorChange)
              return
            const d = this.pixelData.getImageData(props.position.x, props.position.y, 1, 1).data
            if (d[3] === 0)
              return this.setState({mousePosition: props, underMouseColor: undefined})
            this.setState({mousePosition: props, underMouseColor: componentToHex(d[0]) + componentToHex(d[1]) + componentToHex(d[2])})
          }
        }}>
        <div
          className="containerItem"
          style={{visibility: loaded ? 'visible' : 'hidden'}}>
          <img
            src={img + '#' + (new Date()).getTime()}
            ref={i => this.image = i}
            style={{
              width: '100%',
              borderRadius: 4,
              marginBottom: 5
            }}
            crossOrigin=""
            onLoad={() => {
              this.setState({loaded: true})
              setTimeout(() => onLoaded(), 200)
              this.canvas = $('<canvas />')[0]
              this.canvas.width = this.image.width
              this.canvas.height = this.image.height
              this.canvas.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height)
              this.pixelData = this.canvas.getContext('2d')
            }}
          />

          {!hideOrder && <div style={{float: 'left', position: 'relative'}}>
            <div className="text" style={{
              top: 0,
              left: 0,
              position: 'absolute',
              backgroundColor: '#5F9EA0',
              padding: 4,
              borderRadius: 4,
              color: 'white',
              minWidth: 250
            }}>
              <table style={{width: '100%', color: 'white'}}>
                <tr>
                  <td>Product:</td>
                  <td style={{float: 'right'}}>{base.name && base.name}</td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td style={{float: 'right'}}>{base.price && parseFloat(base.price.original).toFixed(2)}	&euro;</td>
                </tr>
              </table>
            </div>
          </div>}
          {!hideOrder && this.state.currentUser.username.toLowerCase() !== base.userUsername.toLowerCase() && <div style={{position: 'relative'}}>
            <a className="btn shadowed"
              onClick={(e) => {
                e.preventDefault()
                addToBasket(Object.assign({}, base))
                this.api.addOrder(Object.assign({}, base))
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                color: 'white',
                margin: 10,
                marginRight: 5,
                backgroundColor: 'blue',
                borderRadius: 4}}>
              Add to Your Basket
            </a>
          </div>}
          <div style={{pading: 40}}>
            {this.props.showColorChange && base && base.colorPallet.match(/.{1,6}/g).map((t, i) =>
                <button
                onClick={() => {
                  const newProd = Object.assign(base, {colorPallet: t + base.colorPallet.replace(t, ''), shopAddress: {id: base.shopAddressId}})
                  this.api.createProduct(newProd)
                  .then(() => this.props.onChanged && this.props.onChanged(newProd))
                }}
                key={i}
                style={{
                  marginLeft: 'auto',
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  border: '2px solid #000',
                  backgroundColor: '#' + t,
                  padding: 5,
                  display: 'inline-block',
                  marginRight: 5
                }}>
              </button>)}
              { this.props.showColorChange && this.state.mousePosition && !this.state.mousePosition.isPositionOutside && this.state.underMouseColor &&
                (<button
                  onClick={() => {
                    const {underMouseColor} = this.state
                    const newProd = Object.assign(base, {colorPallet: underMouseColor + base.colorPallet.replace(underMouseColor, ''), shopAddress: {id: base.shopAddressId}})
                    this.api.createProduct(newProd)
                    .then(() => this.props.onChanged && this.props.onChanged(newProd))
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    position: 'absolute',
                    top: this.state.mousePosition.position.y - 25,
                    left: this.state.mousePosition.position.x - 25,
                    borderRadius: 50,
                    border: '2px solid #000',
                    backgroundColor: '#' + this.state.underMouseColor
                  }}>
                </button>)
              }
          </div>
        </div>
      </ReactCursorPosition>
    )
  }
}

ProductsItem.propTypes = {
  base: PropTypes.object,
  showApproval: PropTypes.bool,
  plain: PropTypes.bool,
  showColorChange: PropTypes.bool,
  onChanged: PropTypes.func,
  onLoaded: PropTypes.func,
  hideOrder: PropTypes.bool,
  addToBasket: PropTypes.func,
  basket: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsItem)
