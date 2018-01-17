import React, {Component, PropTypes} from 'react'
import moment from 'moment'
require('../styles/Messages.scss')

class ProfileImage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize(){
    this.render()
  }

  render() {
    const isSelected = this.props.activeThreadId && this.props.activeThreadId === this.props.base.id
    const userToShow = this.props.base.to.username === this.props.currentUserUsername ? this.props.base.from : this.props.base.to
    return (
      <div
        className={isSelected ? 'selected': 'contact'}
        style={{
          overflow: 'hidden',
          width: '100%',
          margin: 0,
          color: 'white',
          backgroundColor: 'white',
          borderBottom: '1px solid #0043c9'
        }}>
        <a href="/" style={{width: '100%', display: 'block'}} onClick={(e) => {
          e.preventDefault()
          this.props.onClick(this.props.base)
        }}>
          <div style={{padding: 4}}>
            <div className={'row' + (isSelected ? ' selected': ' contact')} style={{textAlign: 'center'}}>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-4" style={{textAlign: 'center'}}>
                <img src={userToShow.profile_picture} className="img-circle" style={{objectFit: 'scale-down', height: 100,width: 100}}/>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-8" style={{textAlign: 'left'}}>
                <div>
                  {userToShow.full_name} ({userToShow.username})
                </div>
                <div
                  style={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    float: 'right',
                    marginRight: 10,
                    fontSize:'0.8em'}}>
                  {moment(this.props.base.created_time).fromNow()}
                </div>

              </div>
            </div>
          </div>
        </a>
      </div>
    )
  }
}

ProfileImage.propTypes = {
  base: PropTypes.object,
  onClick: PropTypes.func,
  currentUserUsername: React.PropTypes.string,
  activeThreadId: React.PropTypes.string
}

export default ProfileImage
