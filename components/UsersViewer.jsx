import React, {Component} from 'react'
import ProfileImage from './ProfileImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class UsersViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.infinitUpdate = true
  }

  fetchUsers() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchUsers(this.props.phrase, this.pagination)
    .then((res) => {
      if(!this.props.scrollToUpdate)
        this.infinitUpdate = false

      this.pagination = res.pagination
      return res.data
    })
  }

  render() {
    return (
      <div>
        {<h3 style={{marginLeft:50}}>results for users with phrase "{this.props.phrase}"</h3>}
        <Viewer
          largeRowCount={8}
          mediomRowCount={5}
          smallRowCount={3.5}
          fetcher={() => this.infinitUpdate ? this.fetchUsers() : Promise.resolve([])}
          ItemView={ProfileImage}
          ItemViewProps={{showUser: true, showLike:true}}
        />
        <div style={{paddingRight: 50, marginBottom: 50}}>
        {<a href={`/search?username=${this.props.phrase}`} style={{width: '100%', display: 'inline-block', textAlign: 'right'}}>see more results</a>}
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
