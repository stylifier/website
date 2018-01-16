import React, {Component, PropTypes} from 'react'
import Footer from '../components/Footer.jsx'
import SimpleImageViewer from '../components/SimpleImageViewer.jsx'
import { withRouter } from 'react-router-dom'
import API from '../src/API'
import Promise from 'bluebird'
import ComposeThreadModal from '../components/ComposeThreadModal.jsx'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    const parts = this.props.location.pathname.split('/')
    this.state = {
      username:  parts[parts.length - 1],
      currentUser: {},
      showComposeModal: false,
      followedByUser: false
    }

    this.getCurrentUser()
    .then((currentUser) => {
      this.setState(Object.assign({currentUser: currentUser}))
      return this.api.fetchUser(this.state.username)
    })
    .then(res => {
      this.setState(Object.assign({}, res))
      return this.api.fetchUserFollowers(this.state.currentUser.username, 0, this.state.username)
    })
    .then(res => {
      this.setState(Object.assign({followedByUser: res.data.length > 0}))
    })
  }

  getCurrentUser() {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem('user_info')))
    } catch (e) {
      return this.api.fetchUserInfo()
    }
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  followClicked(e) {
    e.preventDefault()

    this.api.followUser(this.state.username)
    .then(() =>
      this.api.fetchUserFollowers(this.state.currentUser.username, 0, this.state.username))
    .then(res =>
      this.setState(Object.assign({followedByUser: res.data.length > 0})))
  }

  renderFollowMessageBtn() {
    if(!this.state.currentUser)
      return

    if(this.state.username === this.state.currentUser.username) {
      return (<a className='btn btn-primary' style={{color: 'white', width: '100%'}} >
        edit profile
      </a>)
    }
    else if(this.state.followedByUser) {
      return (<a className='btn btn-primary' onClick={(e) => {
        e.preventDefault()
        this.setState({showComposeModal: true})
      }} style={{color: 'white', width: '100%'}} >
        ask for advice
      </a>)
    }
    else {
      return (<a className='btn btn-primary' onClick={(e) => this.followClicked(e)} style={{color: 'white', width: '100%'}} >
        follow
      </a>)
    }

  }

  render() {
    const isCurrentUser = this.state.username === this.state.currentUser.username
    return (
      <div>
        {this.state.showComposeModal &&
          (<ComposeThreadModal
            defaultValue={this.state.username}
            currentUser={this.state.currentUser}
            onClose={() => this.setState({showComposeModal: false})}/>)}
        <div id="home-sec" className="container" style={{padding: 50}}>
          <div className="row clr-white" style={{textAlign: 'center'}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
              <img src={this.state.profile_picture} className="img-circle" style={{height: 300, objectFit: 'cover',width: 300}}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'left'}}>
              {this.renderFollowMessageBtn()}
              <div>
              {this.state.full_name} <a href={'/profile/'+this.state.username}>@{this.state.username}</a>
              </div>
              <div style={{textAlign: 'left'}}>
              {this.state.bio && this.state.bio.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <SimpleImageViewer username={this.state.username} ItemViewProps={{showUser: false, showLike: !isCurrentUser}}/>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

Profile.propTypes = {
  location: PropTypes.object
}

export default withRouter(Profile)
