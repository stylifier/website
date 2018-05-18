import React, {Component} from 'react'
import ProfileImage from './ProfileImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'
import Promise from 'bluebird'

class SponsorshipViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {currentUser: {}, viewerId: Math.random() * 1000}
    this.sponsorBy = []
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

    return this.api.fetchUserSponsoredBy(this.state.currentUser.username, this.pagination)
    .then((res) => {
      this.oldPagination = this.pagination
      this.pagination = res.pagination
      this.sponsorBy = [...res.data]
      return res.data.map(t => t['sponsored_by'])
    })
  }

  render() {
    return (
      <Viewer
        largeRowCount={8}
        mediomRowCount={5}
        smallRowCount={3.5}
        key={this.state.viewerId}
        fetcher={() =>
          this.state.currentUser.username ?
          this.fetchUserInfo() :
          this.getCurrentUser().then((currentUser) => {
            this.setState(Object.assign({currentUser: currentUser}))
            return this.fetchUserInfo()
          })
        }
        ItemView={ProfileImage}
        ItemViewProps={{
          showUser: true,
          showLike:true,
          customButtonOnClick: (user) =>
            this.api.sponsorUser(user.username, true).then(() => {
              this.pagination = this.oldPagination
              this.setState({viewerId: Math.random() * 1000})
            }),
          customButtonLable: 'Accept request',
          customButtonShowChecker: (user) => this.sponsorBy.filter(t => t['sponsored_by'].username === user.username)[0].status === 'REQUESTED'
        }}/>
    )
  }
}

export default SponsorshipViewer
