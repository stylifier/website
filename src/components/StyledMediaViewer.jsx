import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'
import Promise from 'bluebird'

class StyledMediaViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {
      hasData: false
    }
  }

  fetchFeeds() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.searchMedia(this.props.phrase, this.pagination)
    .then((res) => {
      this.pagination = res.pagination
      if(res.data.length > 0 && !this.state.hasData) {
        this.setState({hasData: true})
      }
      return res.data
    })
  }

  render() {
    return (
      <div>
        {this.state.hasData && <h3 style={{marginLeft:50}}>Media with phrase "{this.props.phrase}"</h3>}
        <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={{showUser: true, showDetailsIcon:true, showTag: true}}/>
      </div>
    )
  }
}

StyledMediaViewer.propTypes = {
  phrase: React.PropTypes.string
}

export default StyledMediaViewer
