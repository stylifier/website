import React, {Component} from 'react'
import ProfileImage from './ProfileImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {currentUser: {}}
  }

  getCurrentUser() {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem('user_info')))
    } catch (e) {
      return this.api.fetchUserInfo()
    }
  }

  fetchUserInfo() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchUserFollowers(this.state.currentUser.username, this.pagination)
    .then((res) => {
      this.pagination = res.pagination
      return res.data
    })
  }

  render() {
    return (
      <Viewer
        largeRowCount={8}
        mediomRowCount={5}
        smallRowCount={3.5}
        fetcher={() =>
          this.state.currentUser.username ?
          this.fetchUserInfo() :
          this.getCurrentUser().then((currentUser) => {
            this.setState(Object.assign({currentUser: currentUser}))
            return this.fetchUserInfo()
          })
        }
        ItemView={ProfileImage}
        ItemViewProps={{showUser: true, showLike:true}}/>
    )
  }
}

export default FeedViewer
