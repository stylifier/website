import React, {Component, PropTypes} from 'react'
require('../styles/Messages.scss')

class ProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const isSelected = this.props.activeThreadId && this.props.activeThreadId === this.props.base.id
    const userToShow = this.props.base.to.username === this.props.currentUserUsername ? this.props.base.from : this.props.base.to
    return (
      <div
        className={isSelected ? 'selected': 'contact'}
        style={{
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
                <img src={userToShow.avatar} className="img-circle" style={{height: 100, objectFit: 'cover',width: 100}}/>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-8" style={{textAlign: 'left'}}>
                <div>
                  {userToShow.firstName} {userToShow.lastName} ({userToShow.username})
                </div>
                <div>{(new Date(Date.parse(this.props.base.createdAt))).toString()}</div>
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
