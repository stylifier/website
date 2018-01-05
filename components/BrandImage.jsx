import React, {Component, PropTypes} from 'react';
require('../styles/feed.scss')

class BrandImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
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
    const href = '/profile/' + this.props.base.username.toString()
    const img = this.props.base.profile_picture
    return (
      <div className="containerItem" style={{visibility: this.state.loaded ? 'visible' : 'hidden', margin: 20}}>
      <div className='box'>
        <a href={href}>
          <img
            src={img}
            style={{
              objectFit: 'scale-down',
              width: '100%',
              height: '100%'
            }}
            className="overlay"
            onClick={() => this.likeClicked()}
            onLoad={() => {
              this.setState({loaded: true})
              this.props.onLoaded()
            }}
          />
        </a>
        </div>
      </div>
    )
  }
}

BrandImage.propTypes = {
  base: PropTypes.object,
  onLoaded: PropTypes.func
}

export default BrandImage
