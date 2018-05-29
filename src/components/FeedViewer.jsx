import React, {Component} from 'react'
import SimpleImage from './SimpleImage.jsx'
import { withRouter } from 'react-router-dom'
import Viewer from './Viewer.jsx'
import API from '../API'
import Promise from 'bluebird'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.state = {
      pagination: undefined
    }
  }

  fetchFeeds() {
    const {pagination} = this.state

    if(pagination === '')
      return Promise.resolve([])

    return this.api.fetchFeeds(pagination)
    .then((res) => {
      this.setState({pagination: res.pagination})
      return res.data
    })
  }

  searchClicked(e) {
    e.preventDefault()
    this.props.history.push(`/search?username=${encodeURIComponent(this.state.searchPhrase)}&brand=${encodeURIComponent(this.state.searchPhrase)}&style=${encodeURIComponent(this.state.searchPhrase)}`)
    window.location.reload()
  }

  renderEmptyMessage() {
    return (
      <div style={{textAlign: 'center', margin: 20, marginTop: '5%', marginBottom: '20%'}}>
        <i className='fa fa-5x fa-road' style={{color: 'lightgray'}}></i>
        <p style={{fontSize: '1.5em'}}>It's lonely here!</p>
        <p style={{fontSize: '1.3em'}}>You can search and follow your favorite brands or users...</p>
        <form
          className="form-inline"
          style={{margin: 9}}
          onSubmit={(e) => this.searchClicked(e)}>
          <div className="input-group">
            <input type="text" value={this.state.searchPhrase} style={{minWidth: '16em'}} onChange={e => this.setState({searchPhrase: e.target.value})} className="form-control" placeholder="Search for Style, Brand or People" aria-label="Username" aria-describedby="basic-addon1"/>
            <span className="input-group-btn">
              <button onClick={e => this.searchClicked(e)} className="btn btn-primary" type="button">Search</button>
            </span>
          </div>
        </form>
      </div>
    )
  }

  render() {
    const {pagination} = this.state

    return (
      <div>
        {!pagination && this.renderEmptyMessage()}
        <Viewer fetcher={() => this.fetchFeeds()} ItemView={SimpleImage} ItemViewProps={{showUser: true, showLike:true, showTag: true}}/>
      </div>
    )
  }
}

FeedViewer.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(FeedViewer)
