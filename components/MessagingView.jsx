import React, {Component, PropTypes} from 'react'
import ConversationViewer from './ConversationViewer.jsx'
import API from '../src/API'
import { withRouter } from 'react-router-dom'
import ComposeThreadModal from './ComposeThreadModal.jsx'
import ImageUploader from '../components/ImageUploader.jsx'

class MessagingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      showUploader: false,
      toUsername: undefined,
      disableToUsernameEdit: false,
      showComposeModal: false,
      media: [],
      uploaderLoading: false,
      send: false
    }

    this.api = new API()
  }

  componentWillReceiveProps() {
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  resize(){
    this.forceUpdate()
  }

  componentDidUpdate() {
    if (this.state.send && !this.state.uploaderLoading) {
      this.setState({send: false})
      this.api.createMessage(this.props.threadId, this.state.message, this.state.media)
      .then(() => {
        this.setState({message: '', showUploader: false, media: []})
        setTimeout(() => this.forceUpdate(), 200)
        this.conversationViewer.viewer.fetcherOnTop.call(this.conversationViewer.viewer)
      })
    }
  }

  messageSend(e) {
    e.preventDefault()
    this.setState({send: true})
  }

  renderMessageCompositionArea() {
    return(
    <div>
      <div className="input-group">
        <textarea value={this.state.message} onChange={e => this.setState({message: e.target.value})} style={{resize: 'none', minHeight: '100%'}} onKeyPress={(e) => e.key === 'Enter' && this.messageSend(e)} id="btn-input" className="form-control input-sm" placeholder="Write your message here..." />
        <span className="input-group-btn">
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-primary" onClick={(e) => this.messageSend(e)}>Send</button>
            <button type="button" className="btn btn-primary" onClick={() => {
              this.setState({showUploader:!this.state.showUploader})
              setTimeout(() => this.forceUpdate(), 200)
            }}> <span className="fa fa-plus fa-lg"/></button>
          </div>
        </span>
      </div>
      {this.state.showUploader && <ImageUploader
        isPublic={false}
        onSubmit={() => this.setState({uploaderLoading: true})}
        onComplete={(media) => this.setState({uploaderLoading: false, media: media})}/>}
    </div>)
  }

  renderMessageSelected() {
    const height = document.getElementById('msgcomposition') ? document.getElementById('msgcomposition').clientHeight : 0
    return (
      <div style={{backgroundColor: '#809dd6', width: '100%',height: '100%'}}>
        <div style={{
          verticalAlign: 'top',
          width: '100%',
          height: 'calc(100% - ' + height + 'px)',
          padding: 10,
          paddingTop: 0 ,
          paddingBottom: 0}}>
          <ConversationViewer
            onLoaded={() => setTimeout(() => this.forceUpdate(), 20)}
            key={this.props.threadId}
            threadId={this.props.threadId}
            messages={this.props.messages}
            ref={ref => this.conversationViewer = ref}
            currentUser={this.props.currentUser}/>
        </div>
        <div id="msgcomposition" style={{zIndex: 99999, verticalAlign: 'bottom', width: '100%',backgroundColor: '#718dc4', padding: 5}}>
          {this.renderMessageCompositionArea()}
        </div>
      </div>
    )
  }

  renderNoMessageSelected() {
    return(
      <div style={{backgroundColor: '#809dd6', display: 'table', width: '100%',height: '100%', textAlign: 'center'}}>
        <div style={{verticalAlign: 'middle', display: 'table-cell'}}>
          <a
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault()
              this.setState({showComposeModal: true})
            }}
            style={{color: 'white'}}>
            Ask for advice
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.showComposeModal &&
          (<ComposeThreadModal
            currentUser={this.props.currentUser}
            onClose={() => this.setState({showComposeModal: false})}/>)}
        {this.props.threadId ? this.renderMessageSelected(): this.renderNoMessageSelected()}
      </div>
    )
  }
}

MessagingView.propTypes = {
  threadId: PropTypes.string,
  threadStatus: PropTypes.string,
  messages: PropTypes.array,
  toUsername: PropTypes.string,
  currentUser: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(MessagingView)
