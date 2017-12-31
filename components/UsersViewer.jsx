import React, {Component} from 'react'
import ProfileImage from './ProfileImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class UsersViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {users: []}
    this.oldestFetchDate = (new Date()).toISOString()
    this.fetchUsers()
  }

  fetchUsers() {
    return this.api.fetchUsers(this.props.phrase, this.oldestFetchDate)
    .then((users) => {
      this.oldestFetchDate = users
      .map((i) => i.createdAt)
      .sort((a, b) => a < b).pop()

      this.state.users.push(...users)
      this.setState({users: this.state.users})
    })
  }

  render() {
    return (
      <div>
        {this.state.users.length > 0 && <h3 style={{marginLeft:50}}>results for users with phrase "{this.props.phrase}"</h3>}
        <Viewer
          largeRowCount={8}
          mediomRowCount={5}
          smallRowCount={3.5}
          fetcher={() => this.props.scrollToUpdate ? this.fetchUsers() : Promise.resolve([])}
          baseItems={this.state.users}
          ItemView={ProfileImage}
          ItemViewProps={{showUser: true, showLike:true}}
        />
        <div style={{paddingRight: 50, marginBottom: 50}}>
        {this.state.users.length > 0 && <a href={`/search?username=${this.props.phrase}`} style={{width: '100%', display: 'inline-block', textAlign: 'right'}}>see more results</a>}
        </div>
      </div>
    )
  }
}

UsersViewer.propTypes = {
  scrollToUpdate: React.PropTypes.bool,
  phrase: React.PropTypes.string
}

export default UsersViewer
