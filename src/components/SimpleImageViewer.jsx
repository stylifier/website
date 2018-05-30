import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'
import actions from '../actions'
import Promise from 'bluebird'
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        openImageUploader: () =>
          dispatch((actions.openImageUploader())),
        closeImageUploader: () =>
          dispatch((actions.closeImageUploader()))
    }
};

class SimpleImageViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.fetchFeeds()
  }

  renderEmptyMessage() {
    return (
      <div style={{textAlign: 'center', margin: 20, marginTop: '5%', marginBottom: '20%'}}>
        <i className='fa fa-5x fa-info' style={{color: 'lightgray'}}></i>
        <p style={{fontSize: '1.5em'}}>You have no image uploaded yet!</p>
        <p style={{fontSize: '1.3em'}}>You can always add images to your profile by pressing cross (+) on navigation menu.</p>
        <button onClick={e => {
          e.preventDefault()
          this.props.openImageUploader()
        }} className="btn btn-primary mb-2">Add Images to Your Profile</button>
      </div>
    )
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
    const {showEmptyMessage} = this.props
    console.log('==>?', showEmptyMessage)

    return (
      <div>
        {(showEmptyMessage && !this.pagination) ? this.renderEmptyMessage() : ''}
        <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={this.props.ItemViewProps}/>
      </div>
    )
  }
}

SimpleImageViewer.propTypes = {
  username: React.PropTypes.string,
  ItemViewProps: React.PropTypes.object,
  showEmptyMessage: React. PropTypes.bool
}

export default connect(undefined, mapDispatchToProps)(SimpleImageViewer)
