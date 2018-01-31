import React, {Component, PropTypes} from 'react'
import ConversationViewer from './ConversationViewer.jsx'
import CloseThreadModal from './CloseThreadModal.jsx'
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
      showRatingModal: false,
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
    if(this.state.message.trim() !== '' || this.state.media.length > 0)
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

  renderConversationHeader() {
    const {thread} = this.props
    let showBack = window.innerWidth < 768 && this.state.threadId? false : true

    if(!thread.from)
      return
    const recipient = thread.from.username === this.props.currentUser.username ?
      thread.to : thread.from
    const isFromMe = this.props.thread.from.username === this.props.currentUser.username
    return (
      <div>
        <button
          type="button"
          className='fa fa-3x fa-arrow-circle-o-left'
          aria-hidden="true"
          style={{
            marginTop: 5,
            color: 'white',
            backgroundColor: 'Transparent',
            backgroundRepeat:'no-repeat',
            border: 'none',
            cursor:'pointer',
            overflow: 'hidden',
            outline:'none',
            float: 'left',
            visibility: showBack ? 'visible': 'hidden'
          }}
          onClick={() => {
            this.props.history.push('/messages/' + (this.props.query ? `?query=${encodeURIComponent(this.props.query)}` : ''))
          }}></button>

          {(this.props.thread.status !== 'CLOSED' && (this.props.thread.status !== 'RATING' || isFromMe)) && <button
            type="button"
            aria-hidden="true"
            style={{
              marginTop: 8,
              marginLeft: '20',
              color: 'white',
              padding: 0,
              paddingRight: 10,
              paddingLeft: 10,
              borderRadius: 3,
              backgroundColor: 'Transparent',
              backgroundRepeat:'no-repeat',
              cursor:'pointer',
              overflow: 'hidden',
              outline:'none',
              float: 'left',
              visibility: showBack ? 'visible': 'hidden'
            }}
            onClick={() => this.setState({showRatingModal: true})}> End advice</button>}

        <img src={recipient.profile_picture} className="img-circle" style={{width: 50, objectFit: 'cover', height: 50, marginTop: 3, float: 'right'}}/>
        <div style={{color: 'white', fontSize: 18, margin: 10, float: 'right'}}>
          {recipient.full_name} ({recipient.username})
        </div>
        {(this.props.thread.status !== 'CLOSED' && (this.props.thread.status !== 'RATING' || isFromMe)) && <button
          type="button"
          aria-hidden="true"
          style={{
            marginTop: 8,
            marginLeft: '5%',
            color: 'white',
            padding: 0,
            paddingRight: 10,
            paddingLeft: 10,
            borderRadius: 3,
            backgroundColor: 'Transparent',
            backgroundRepeat:'no-repeat',
            cursor:'pointer',
            overflow: 'hidden',
            outline:'none',
            float: 'right',
            visibility: showBack ? 'visible': 'hidden'
          }}
          onClick={() => ({})}> Add contribution</button>}
      </div>
    )
  }

  renderMessageSelected() {
    const height = document.getElementById('msgcomposition') ? document.getElementById('msgcomposition').clientHeight + 60 : 200
    return (
      <div style={{backgroundColor: '#809dd6', width: '100%',height: '100%'}}>
        <div style={{zIndex: 99999, verticalAlign: 'bottom', width: '100%',backgroundColor: '#718dc4', padding: 5, height: 60}}>
          {this.renderConversationHeader()}
        </div>
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
        {this.state.showRatingModal && <CloseThreadModal base={this.props.thread} onClose={() => this.setState({showRatingModal: false})}/>}
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
  thread: PropTypes.object,
  threadStatus: PropTypes.string,
  messages: PropTypes.array,
  toUsername: PropTypes.string,
  currentUser: PropTypes.object,
  query: React.PropTypes.string,
  changeCurrentThread: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(MessagingView)
