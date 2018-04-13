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

    this.resized = this.resized.bind(this);

    this.state = {
      username:  '',
      query: '',
      threadId: this.props.location.pathname.split('/')[2],
      currentUser: {},
      thread: {},
      hash: '',
      followersSuggestionList: [],
      assets: []
    }
  }

  setURLElements(location) {
    const args = {}
    location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1] || '')

    this.setState({
      query: args.query ? decodeURIComponent(args.query) : '',
      threadId: location.pathname.split('/')[2]
    })
  }

  refreshStats() {
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    window.addEventListener('resize', this.resized)

    this.setURLElements(location)
    this.unlisten = this.props.history.listen((location) => this.setURLElements(location))

    this.getCurrentUser()
    .then((user) => this.setState({currentUser: Object.assign({}, user)}))
  }

  componentWillUnmount() {
    this.unlisten()
    window.removeEventListener('resize', this.resized)
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
    this.props.history.push('/messages' + (this.state.threadId ? `/${this.state.threadId}` : '') + `?query=${encodeURIComponent(this.state.query)}`)
  }

  resized() {
    this.forceUpdate()
  }

  renderMessages() {
    let showMessages = window.innerWidth < 768 && !this.state.threadId ? false : true
    return (<div className="col-lg-9 col-md-8 col-sm-8 col-xs-12" style={{padding: 0, width: showMessages ? '' : '0', display: showMessages ? '' : 'none'}}>
      <MessagingView
        ref={ref => this.messageingViewer = ref}
        threadId={this.state.threadId}
        thread={this.state.thread}
        messages={this.state.messages}
        fetcher={() => this.fetchMessages()}
        currentUser={this.state.currentUser}
        changeCurrentThread={(id, i) => this.setState({threadId: id, thread: i})}
        query={this.state.query}/>
    </div>)
  }

  renderContacts() {
    let showContacts = window.innerWidth < 768 && this.state.threadId? false : true
    return (<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12" style={{padding: 0, margin: 0, height: '100%', width: showContacts ? '' : '0', display: showContacts ? '' : 'none'}}>
      <form className="form-inline" style={{marginTop: 5,marginBottom: 0, width: '100%'}} onSubmit={(e) => this.searchClicked(e)}>
        <div className="input-group" style={{width: '100%'}}>
          <input type="text" value={this.state.query} onChange={e => this.setState({query: e.target.value})} className="form-control" placeholder="Search people" aria-label="Username" aria-describedby="basic-addon1"/>
          <span className="btn input-group-addon" id="basic-addon1" onClick={(e) => this.searchClicked(e)}><i className="fa fa-search"></i></span>
        </div>
      </form>
      <ThreadsViewer
        key={this.state.query}
        changeCurrentThread={(id, i) => this.setState({threadId: id, thread: i})}
        threadId={this.state.threadId}
        currentUser={this.state.currentUser}
        query={this.state.query}
        updateThread={(t) => {
          this.setState({thread: Object.assign({}, t)})
        }}/>
    </div>)
  }
  render() {
    return (
      <div>
        <div id="home-sec" className="container" style={{padding: 0, margin: 0, width: '100%', height: 'calc(100% - 50px)', maxHeight: 'calc(100% - 400px) !important'}}>

          <div className="row clr-white" style={{padding: 0, margin: 0, width: '100%'}}>
            {this.renderContacts()}
            {this.renderMessages()}
          </div>
        </div>
      </div>
    )
  }
}

Messages.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(Messages)
