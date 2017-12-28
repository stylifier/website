import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.oldestFetchDate = (new Date()).toISOString()

    this.fetchFeeds()
  }

  fetchFeeds() {
    return this.api.fetchFeeds(this.oldestFetchDate)
    .then((feeds) => {
      this.oldestFetchDate = feeds
      .map((i) => i.createdAt)
      .sort((a, b) => a < b).pop()

      return feeds
    })
  }

  render() {
    return (
      <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={{showUser: true, showLike:true}}/>
    )
  }
}

export default FeedViewer
