import React, {Component, PropTypes} from 'react'
import Footer from '../components/Footer.jsx'
import SimpleImageViewer from '../components/SimpleImageViewer.jsx'
import { withRouter } from 'react-router-dom'
import API from '../src/API'
import Promise from 'bluebird'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    const parts = this.props.location.pathname.split('/')
    this.state = {
      username:  parts[parts.length - 1],
      currentUser: {}
    }

    this.getCurrentUser()
    .then((currentUser) => {
      this.setState(Object.assign({currentUser: currentUser}))
      return this.api.fetchUser(this.state.username)
    })
    .then(res => this.setState(Object.assign({}, res)))
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

  render() {
    const isCurrentUser = this.state.username === this.state.currentUser.username
    return (
      <div>
        <div id="home-sec" className="container" style={{padding: 50}}>
          <div className="row clr-white" style={{textAlign: 'center'}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
              <img src={this.state.profile_picture} className="img-circle" style={{height: 300, objectFit: 'cover',width: 300}}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'left'}}>
              <div>
              {this.state.firstName} {this.state.lastName} ({this.state.username})
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
