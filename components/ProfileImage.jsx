import React, {Component, PropTypes} from 'react';
require('../styles/feed.scss')

class ProfileImage extends Component {
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
    const img = this.props.base.avatar.toString()
    return (
      <div className="containerItem" style={{visibility: this.state.loaded ? 'visible' : 'hidden'}}>
      <div className='box'>
        <img src={img} style={{objectFit: 'cover',width: '100%', height: '100%'}} className="img-circle overlay" onClick={() => this.likeClicked()} onLoad={() => {
          this.setState({loaded: true})
          this.props.onLoaded()
        }}/>
        </div>
        <div>
          <div style={{textAlign: 'center', width: '100%'}}><a href={href}>{this.props.base.username}</a></div>
        </div>
      </div>
    )
  }
}

ProfileImage.propTypes = {
  base: PropTypes.object,
  onLoaded: PropTypes.func
}

export default ProfileImage
