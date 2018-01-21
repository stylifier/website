import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'
import CloseThreadModal from './CloseThreadModal.jsx'
import Viewer from './Viewer.jsx'
import Promise from 'bluebird'
import API from '../src/API'

class ThreadsViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRatingModal: false,
      itemToClose: {}
    }
    this.api = new API()
  }

  fetcher() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchThreads(this.state.query, this.oldestFetchedThread)
    .then((res) => {
      this.pagination = res.pagination
      return res.data
    })
  }

  render() {
    return (
      <div>
        {this.state.showRatingModal && <CloseThreadModal base={this.state.itemToClose} onClose={() => this.setState({showRatingModal: false})}/>}
        <div style={{maxHeight: 'calc(100% - 40px)', overflowY: 'auto'}}>
          <Viewer
            className="btn-group-vertical"
            role="group"
            largeRowCount={1}
            mediomRowCount={1}
            smallRowCount={1}
            styleOverwrite={{margin: 0}}
            fetcher={() => this.fetcher()}
            component="div"
            gutter={0}
            ItemView={ThreadItem}
            ref={ref => !this.state.viewer && this.setState({viewer: ref})}
            ItemViewProps={{
              onClick:(i) => {
                this.props.changeCurrentThread(i.id)
                this.props.history.push('/messages/' + i.id + (this.props.query ? `?query=${encodeURIComponent(this.props.query)}` : ''))
              },
              onClose:(i) => {
                if(i.status === 'REQUESTED') {
                  return this.api.closeThread(i.id, {rating: 0, review: ''})
                }
                this.setState({showRatingModal: true, itemToClose: i})
              },
              currentUserUsername: this.props.currentUser.username,
              activeThreadId: this.props.threadId
            }}
          />
        </div>
      </div>
    )
  }
}

ThreadsViewer.propTypes = {
  threads: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  query: React.PropTypes.string,
  threadId: React.PropTypes.string,
  changeCurrentThread: React.PropTypes.func
}

export default withRouter(ThreadsViewer)
