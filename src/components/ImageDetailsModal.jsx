import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../actions'
import Viewer from './Viewer.jsx'
import SimpleImage from './SimpleImage.jsx'
import API from '../API'
import moment from 'moment'

class ImageDitailsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {},
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      description: props.imageDetails.base.description || ''
    }
    this.api = new API()
  }

  componentDidMount() {
    $('#imageDetailsModal').modal('show')
    $('#imageDetailsModal').on('hidden.bs.modal', () => this.props.closeImageDetails())
    window.addEventListener('resize', () => this.updateDimensions());
  }

  updateDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  componentWillMount() {
    this.updateDimensions()
  }

  componentWillUnmount() {
      window.removeEventListener('resize', () => this.updateDimensions());
  }

  componentDidUpdate() {
  }

  renderDetailsSection() {
    const {imageDetails, currentUser, openThreadCreator} = this.props
    const {base} = imageDetails

    const isMe = currentUser.username === base.user.username

    return (
      <div style={{width: '100%', float: 'none'}}>
        <div className="container" style={{width: '100%', textAlign: 'left', float: 'left', marginTop: 20, marginBottom: 20}}>
          <a href={'/profile/' + base.user.username}><img  src={base.user.profile_picture} className="img-circle" style={{width: 80, objectFit: 'cover', height: 80, float: 'left'}}/></a>
          <div style={{float: 'left', marginLeft: 20}}>
            <h4 style={{marginTop: 20}}>
              <a href={'/profile/' + base.user.username} style={{textDecoration: 'none', color: 'black'}}>
                {base.user.full_name}
              </a>
              <a href={'/profile/' + base.user.username} style={{textDecoration: 'none', color: '#595959', marginLeft: 3}}>
                @{base.user.username}
              </a>
            </h4>
            <h5> {moment(base.created_time).fromNow()}</h5>
          </div>
          {isMe && <a className={this.state.isEditing ? 'btn btn-success' : 'btn btn-primary'} onClick={(e) => {
            e.preventDefault()
            this.state.isEditing && this.api.addDescriptionToMedia(base.id, this.state.description)
            this.setState({isEditing: !this.state.isEditing})
          }} style={{color: 'white', float: 'right'}} >
            {this.state.isEditing ? 'Save Chanes' : 'Edit Description'}
          </a>}
          {!isMe && <a className='btn btn-primary' data-dismiss="modal" style={{color: 'white', float: 'right'}} onClick={() => {
            setTimeout(() => {
              openThreadCreator([base], base.user.username)
            }, 200)
          }}>
            Ask about This Item
          </a>}
        </div>
        <div style={{float: 'none', padding: 10}}>
          {!this.state.isEditing && this.state.description.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
          {this.state.isEditing && <textarea
            value={this.state.description}
            onChange={e => this.setState({description: e.target.value})}
            style={{width: '100%', height: '200'}}
            onKeyPress={(e) => e.key === 'Enter' && this.messageSend(e)}
            id="btn-input"
            className="form-control input-sm"
            placeholder={'Write short description about items in this photo and their brands...'} />}
        </div>
      </div>
    )
  }

  render() {
    const isLandscape = this.state.windowWidth / this.state.windowHeight > 1

    return (
      <div
      id="imageDetailsModal"
      style={{position: 'fixed', top: 0, textAlign: 'center', left: 0, width: '100%', height: '100%', maxWidth: '95%'}}
      className="modal modal-dialog fade"
      role="dialog"
      aria-labelledby="imageDetailsModalLabel"
      aria-hidden="true">
        <div className="modal-content" style={{position: 'relative', margin: 'auto', width: 1800,  maxWidth: '100%'}}>
          <div className="modal-header" style={{textAlign: 'left'}}>
            <button
              className="btn btn-danger" style={{float: 'right'}}
              data-dismiss="modal">
              X
            </button>
          </div>
          <div className="container" style={{maxWidth: '100%', width: '100%'}}>
            <div className="row" >
              <div className={isLandscape ?
                'col-lg-3 col-md-3 col-sm-3 col-xs-3' :
                'col-lg-12 col-md-12 col-sm-12 col-xs-12'}>
                {this.renderDetailsSection()}
              </div>
              <div className={isLandscape ?
                'col-lg-9 col-md-9 col-sm-9 col-xs-9' :
                'col-lg-12 col-md-12 col-sm-12 col-xs-12'}>
                <div style={{marginBottom: 10}}>
                  <Viewer
                    largeRowCount={1}
                    mediomRowCount={1}
                    smallRowCount={1}
                    dommy={true}
                    styleOverwrite={{maxWidth: '100%', width: '100%', maxHeight: '100%'}}
                    baseItems={[this.props.imageDetails.base]}
                    ItemView={SimpleImage}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>)
  }
}

ImageDitailsModal.propTypes = {
  closeImageDetails: React.PropTypes.func,
  openImageDetails: React.PropTypes.func,
  openThreadCreator: React.PropTypes.func,
  imageDetails: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(connect(
  (state) => ({
    imageDetails : state.imageDetails,
    currentUser : state.user
  }),
  (dispatch) => ({
    openThreadCreator: (media, username) =>
      dispatch((actions.openThreadCreator(media, username))),
    openImageDetails: () =>
      dispatch((actions.openImageDetails())),
    closeImageDetails: () =>
      dispatch((actions.closeImageDetails()))
  }))(ImageDitailsModal))
