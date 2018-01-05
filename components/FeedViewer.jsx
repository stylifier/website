import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
  }

  fetchFeeds() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchFeeds(this.oldestFetchDate, this.pagination)
    .then((res) => {
      this.pagination = res.pagination
      return res.data
    })
  }

  render() {
    return (
      <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={{showUser: true, showLike:true}}/>
    )
  }
}

export default FeedViewer
