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
    const {customButtonLable, customButtonOnClick, base, customButtonShowChecker} = this.props
    const href = '/profile/' + base.username.toString()
    const img = base.profile_picture

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
          <div style={{textAlign: 'center', width: '100%'}}>
            {customButtonOnClick && customButtonLable && customButtonShowChecker && customButtonShowChecker(base) && (
              <a className='btn btn-primary' onClick={(e) => {
                e.preventDefault()
                customButtonOnClick(base)
              }} style={{color: 'white'}} >{customButtonLable}</a>
            )}
          </div>
        </div>
        <div>
          <div style={{textAlign: 'center', width: '100%'}}><a href={href}>{base.username}</a></div>
        </div>
        <div style={{textAlign: 'center', width: '100%'}}>
          {base.rating > 0 &&
            <Rating
              initialRating={base.rating}
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
  onLoaded: PropTypes.func,
  customButtonLable: PropTypes.string,
  customButtonOnClick: PropTypes.func,
  customButtonShowChecker: PropTypes.func
}

export default ProfileImage
