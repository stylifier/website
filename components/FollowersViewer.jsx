import React, {Component} from 'react'
import ProfileImage from './ProfileImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {followers: []}
    this.fetchUserInfo()
  }

  fetchUserInfo() {
    return this.api.fetchUserInfo(this.oldestFetchDate)
    .then((userInfo) => {
      this.state.followers.push(...userInfo.followers)
      this.setState({followers: this.state.followers})
    })
  }

  render() {
    return (
      <Viewer largeRowCount={8} mediomRowCount={5} smallRowCount={3.5} fetcher={() => Promise.resolve([])} baseItems={this.state.followers} ItemView={ProfileImage} ItemViewProps={{showUser: true, showLike:true}}/>
    )
  }
}

export default FeedViewer
