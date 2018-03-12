import React, {Component, PropTypes} from 'react';
import Rating from 'react-rating'
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
    const img = this.props.base.profile_picture
    return (
      <div className="containerItem" style={{visibility: this.state.loaded ? 'visible' : 'hidden', margin: 20}}>
      <div className='box'>
        <a href={href}>
          <img
            src={img}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
            className="img-circle overlay"
            onClick={() => this.likeClicked()}
            onLoad={() => {
              this.setState({loaded: true})
              this.props.onLoaded()
            }}
          />
        </a>
        </div>
        <div>
          <div style={{textAlign: 'center', width: '100%'}}><a href={href}>{this.props.base.username}</a></div>
        </div>
        <div style={{textAlign: 'center', width: '100%'}}>
          {this.props.base.rating > 0 &&
            <Rating
              initialRating={this.props.base.rating}
              readonly
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x fullstar"
            />}
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
