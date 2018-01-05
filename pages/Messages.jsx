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
      currentUser: {}
    }
  }

  setURLElements(location) {
    const args = {}
    location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    this.setState({
      query: args.query ? decodeURIComponent(args.query) : '',
      threadId: location.pathname.split('/')[2]
    })
  }
  
  refreshStats() {
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

    this.threadsViewer.viewer.setSetate({items: []})

    this.oldestFetchedThread = (new Date()).toISOString()
    this.setState({threads: this.state.threads})
    this.fetchThreads()
    .then(() => this.forceUpdate())
    this.props.history.push('/messages' + (this.state.threadId ? `/${this.state.threadId}` : '') + `?query=${encodeURIComponent(this.state.query)}`)
  }

  resized() {
    this.forceUpdate()
  }

  renderMessages() {
    return (<div className="col-lg-9 col-md-8 col-sm-9 col-xs-12" style={{padding: 0}}>
      <MessagingView ref={ref => this.messageingViewer = ref} threadId={this.state.threadId} messages={this.state.messages} fetcher={() => this.fetchMessages()} currentUser={this.state.currentUser}/>
    </div>)
  }

  renderContacts() {
    return (<div className="col-lg-3 col-md-4 col-sm-3 col-xs-12" style={{padding: 0, margin: 0, height: '100%', maxHeight: '100%'}}>
      <form className="form-inline" style={{marginTop: 5,marginBottom: 0, width: '100%'}} onSubmit={(e) => this.searchClicked(e)}>
        <div className="input-group" style={{width: '100%'}}>
          <input type="text" value={this.state.query} onChange={e => this.setState({query: e.target.value})} className="form-control" placeholder="Search people" aria-label="Username" aria-describedby="basic-addon1"/>
          <span className="btn input-group-addon" id="basic-addon1" onClick={(e) => this.searchClicked(e)}><i className="fa fa-search"></i></span>
        </div>
      </form>
      <ThreadsViewer
        changeCurrentThread={(id) => this.setState({threadId: id})}
        threadId={this.state.threadId}
        currentUser={this.state.currentUser}
        query={this.state.query}/>
    </div>)
  }
  render() {
    let showContacts = window.innerWidth < 768 && this.state.threadId? false : true
    let showMessages = window.innerWidth < 768 && !this.state.threadId ? false : true
    return (
      <div>
        <div id="home-sec" className="container" style={{padding: 0, margin: 0, width: '100%', height: 'calc(100% - 50px)', maxHeight: 'calc(100% - 400px) !important'}}>
          <div className="row clr-white" style={{padding: 0, margin: 0, width: '100%'}}>
            {showContacts ? this.renderContacts() : ''}

            {showMessages ? this.renderMessages() : ''}
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
