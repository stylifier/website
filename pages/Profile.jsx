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
      firstname: '',
      lastname: '',
      avatar: '',
      followers: [],
      rating: '',
      story: '',
      sponsors: [],
      styles: [],
      username:  parts[parts.length - 1]
    }
    this.currentUser = {}

    this.getCurrentUser()
    .then((currentUser) => {
      this.currentUser = currentUser
      return this.api.fetchUser(this.username)
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
    const isCurrentUser = this.state.username === this.currentUser.username
    return (
      <div>
        <div id="home-sec" className="container" style={{padding: 50}}>
          <div className="row clr-white" style={{textAlign: 'center'}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
              <img src={this.state.avatar} className="img-circle" style={{height: 300, objectFit: 'cover',width: 300}}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'left'}}>
              <div>
              {this.state.firstName} {this.state.lastName} ({this.state.username})
              </div>
              <div style={{textAlign: 'left'}}>
              {this.state.story.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
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
