import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class SimpleImageViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.fetchFeeds()
  }

  fetchFeeds() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchUserMedia(this.props.username, this.pagination)
    .then((res) => {
      this.pagination = res.pagination
      return res.data
    })
  }

  render() {
    return (
      <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={this.props.ItemViewProps}/>
    )
  }
}

SimpleImageViewer.propTypes = {
  username: React.PropTypes.string,
  ItemViewProps: React.PropTypes.object
}

export default SimpleImageViewer
