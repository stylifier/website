import React, {Component, PropTypes} from 'react'
import ThreadsViewer from '../components/ThreadsViewer.jsx'
import { withRouter } from 'react-router-dom'
import MessagingView from '../components/MessagingView.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.oldestFetchDate = (new Date()).toISOString()

    const parts = this.props.location.pathname.split('/')

    const args = {}
    this.props.location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    this.state = {
      username:  parts[1],
      threads: [],
      query: args.query ? decodeURIComponent(args.query) : '',
      threadId: this.props.location.pathname.split('/')[2]
    }
    this.currentUser = {}

    this.getCurrentUser()
    .then((user) => {
      this.setState({currentUser: Object.assign({}, user)})
      return this.api.fetchThreads(this.state.query, this.oldestFetchDate)
    })
    .then(() => this.fetchThreads())
  }

  fetchThreads() {
    return this.api.fetchThreads(this.state.query, this.oldestFetchDate)
    .then((users) => {
      this.oldestFetchDate = users
      .map((i) => i.createdAt)
      .sort((a, b) => a < b).pop()

      this.state.users.push(...users)
      this.setState({users: this.state.users})

      setTimeout(() => this.forceUpdate(), 100)
      setTimeout(() => this.forceUpdate(), 200)
    })
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  getCurrentUser() {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem('user_info')))
    } catch (e) {
      return this.api.fetchUserInfo()
    }
  }

  searchClicked(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div id="home-sec" className="container" style={{padding: 0, margin: 0, width: '100%'}}>
          <div className="row clr-white" style={{padding: 0, margin: 0, width: '100%'}}>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{padding: 0, margin: 0}}>
              <form className="form-inline" style={{marginTop: 9, width: '100%'}} onSubmit={(e) => this.searchClicked(e)}>
                <div className="input-group" style={{width: '100%'}}>
                  <span className="input-group-addon" id="basic-addon1">@</span>
                  <input type="text" value={this.state.query} onChange={e => this.setState({query: e.target.value})} className="form-control" placeholder="Search brand or people" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </form>
              <ThreadsViewer/>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
              <MessagingView threadId={this.state.threadId}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Messages.propTypes = {
  location: PropTypes.object
}

export default withRouter(Messages)
