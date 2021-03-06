import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'
import CloseThreadModal from './CloseThreadModal.jsx'
import Viewer from './ViewerScrolled.jsx'
import Promise from 'bluebird'
import API from '../API'

class ThreadsViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRatingModal: false,
      itemToClose: {}
    }
    this.api = new API()
  }

  componentDidMount() {
    this.pullingInterval = setInterval(() => this.viewer.fetcher.call(this.viewer), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.pullingInterval)
  }

  fetcher() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchThreads(this.props.query, this.oldestFetchedThread)
    .then((res) => {
      res.data.filter(t => t.id === this.props.threadId)
      .forEach(t => {
        this.props.updateThread && this.props.updateThread(t)
        this.props.changeCurrentThread(t.id, t)
      })
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
            hideLoading={true}
            gutter={0}
            ItemView={ThreadItem}
            ref={ref => this.viewer = ref}
            ItemViewProps={{
              onClick:(i) => {
                this.props.changeCurrentThread(i.id, i)
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
  changeCurrentThread: React.PropTypes.func,
  updateThread: React.PropTypes.func
}

export default withRouter(ThreadsViewer)
