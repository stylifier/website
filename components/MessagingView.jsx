import React, {Component, PropTypes} from 'react'
import ConversationViewer from './ConversationViewer.jsx'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import API from '../src/API'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

class MessagingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      showUploader: false,
      assets: []
    }

    this.api = new API()

    this.uploader = new FineUploaderTraditional({
      options: {
        chunking: {
          enabled: true
        },
        deleteFile: {
          enabled: false
        },
        request: {
          endpoint: this.api.baseAddress + '/images',
          customHeaders: {
            Authorization: 'Bearer '+ this.api.userToken,
            'X-Is-Public': false,
            'X-Thread-Id': this.props.threadId
          }
        },
        retry: {
          enableAuto: true
        }
      }
    })

    this.uploader.on('submit', () => {
      this.forceUpdate()
    })

    this.uploader.on('complete', (id, name, response) => {
      this.state.assets.push(response.id)
    })

    this.uploader.on('onAllComplete', () => {
    })
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize(){
    this.forceUpdate()
  }

  messageSend(e) {
    e.preventDefault()
    this.setState({message: '', showUploader: false, assets: []})
    setTimeout(() => this.forceUpdate(), 200)
  }

  renderMessageCompositionArea() {
    return(
    <div>
      <div className="input-group">
        <textarea value={this.state.message} onChange={e => this.setState({message: e.target.value})} style={{resize: 'none', minHeight: '100%'}} onKeyPress={(e) => e.key === 'Enter' && this.messageSend(e)} id="btn-input" className="form-control input-sm" placeholder="Write your message here..." />
        <span className="input-group-btn">
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-primary">Send</button>
            <button type="button" className="btn btn-primary" onClick={() => {
              this.setState({showUploader:!this.state.showUploader})
              setTimeout(() => this.forceUpdate(), 200)
            }}> <span className="fa fa-plus fa-lg"/></button>
          </div>
        </span>
      </div>
      {this.state.showUploader && <Gallery uploader={ this.uploader } />}
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
          <a className='btn btn-primary' style={{color: 'white'}}>
            Make a new conversation
          </a>
        </div>
      </div>
    )
  }

  render() {
    return this.props.threadId ? this.renderMessageSelected(): this.renderNoMessageSelected()
  }
}

MessagingView.propTypes = {
  threadId: PropTypes.string,
  messages: PropTypes.array,
  currentUser: PropTypes.object
}

export default MessagingView
