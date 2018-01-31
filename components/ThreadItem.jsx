import React, {Component, PropTypes} from 'react'
import moment from 'moment'
require('../styles/Messages.scss')

class ProfileImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  resize(){
    this.render()
  }

  render() {
    const isSelected = this.props.activeThreadId && this.props.activeThreadId === this.props.base.id
    const isFromMe = this.props.base.from.username === this.props.currentUserUsername
    const userToShow = isFromMe ? this.props.base.to : this.props.base.from
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
          <div style={{padding: 4, marginRight: 10}}>

            {(this.props.base.status !== 'CLOSED' && (this.props.base.status !== 'RATING' || isFromMe)) && <a type="button" className="close fa-2x" onClick={(e) => {
              e.preventDefault()
              this.props.onClose && this.props.onClose(Object.assign({}, this.props.base))
            }}>×</a>}
            <div className={'row' + (isSelected ? ' selected': ' contact')} style={{textAlign: 'center'}}>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-4" style={{textAlign: 'center'}}>
                <img src={userToShow.profile_picture} className="img-circle" style={{objectFit: 'scale-down', height: 100,width: 100}}/>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-8" style={{textAlign: 'left'}}>
                <div>
                  {userToShow.full_name} ({userToShow.username})
                </div>

                {this.props.base.status === 'REQUESTED' &&
                  <div style={{float: 'right', color: 'green', marginRight: 20}}>
                    <i className={'fa fa-2x ' + (isFromMe ? 'fa-arrow-right' : 'fa-arrow-left')} aria-hidden="true"></i>
                  </div>}

                {this.props.base.status === 'OPENED' &&
                  <div style={{float: 'right', color: 'green', marginRight: 20}}>
                    <i className='fa fa-2x fa-check' aria-hidden="true"></i>
                  </div>}

                {this.props.base.status === 'CLOSED' &&
                  <div style={{float: 'right', color: 'darkgray', marginRight: 20}}>
                    <i className='fa fa-2x fa-archive' aria-hidden="true"></i>
                  </div>}

                {this.props.base.status === 'RATING' &&
                  <div style={{float: 'right', color: 'green', marginRight: 20}}>
                    <i className={'fa fa-2x ' + (isFromMe ? 'fa-question-circle' : 'fa-archive')} aria-hidden="true"></i>
                  </div>}

                <div
                  style={{
                    float: 'left',
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
  onClose: PropTypes.func,
  currentUserUsername: React.PropTypes.string,
  activeThreadId: React.PropTypes.string
}

export default ProfileImage
