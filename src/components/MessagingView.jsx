import React, {Component, PropTypes} from 'react'
import ConversationViewer from './ConversationViewer.jsx'
import CloseThreadModal from './CloseThreadModal.jsx'
import Autosuggest from 'react-autosuggest'
import API from '../API'
import { withRouter } from 'react-router-dom'
import ComposeThreadModal from './ComposeThreadModal.jsx'
import ImageUploader from './ImageUploader.jsx'
import Viewer from './Viewer.jsx'
import SimpleImage from './SimpleImage.jsx'
import ScrollArea from 'react-scrollbar'

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
      productsSuggestion: [],
      product: '',
      uploaderLoading: false,
      selfProducts: [],
      send: false
    }

    this.api = new API()
  }

  componentWillReceiveProps() {
  }

  componentDidMount() {
    this.api.fetchSelfProducts()
    .then(t => this.setState({selfProducts: [...t]}))
  }

  componentWillUnmount() {
  }

  resize(){
    this.forceUpdate()
  }

  componentDidUpdate() {
    if (this.state.send && !this.state.uploaderLoading) {
      this.setState({send: false})
      this.api.createMessage(this.props.threadId, this.state.message, this.state.media, this.state.selfProducts.filter(t => t.name === this.state.product))
      .then(() => {
        this.setState({message: '', showUploader: false, media: [], product: ''})
        setTimeout(() => this.forceUpdate(), 200)
        this.conversationViewer.viewer.fetcherOnTop.call(this.conversationViewer.viewer)
      })
    }
  }

  messageSend(e) {
    e.preventDefault()
    if(this.state.message.trim() !== '' || this.state.media.length > 0 || this.state.selfProducts.filter(t => t.name === this.state.product).length !== 0)
      this.setState({send: true})
  }

  renderUploadphotoToBeShared(recipient) {
    return(
    <div>
      <div className="input-group">
        <p style={{color: 'white', textAlign: 'left'}}> {`Your advice has been closed, you can ask ${recipient.full_name} to share your look on his profile. Just upload photos you want to be shared.`} </p>
        <span className="input-group-btn">
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-primary" onClick={() => {
              this.setState({showUploader:!this.state.showUploader})
              setTimeout(() => this.forceUpdate(), 200)
            }}> <span className="fa fa-plus fa-lg"/></button>
          </div>
        </span>
      </div>
      {this.state.showUploader && <ImageUploader
        isPublic={false}
        taggedUsers={[this.props.currentUser.username]}
        onSubmit={() => this.setState({uploaderLoading: true})}
        onComplete={(media) => {
          this.setState({uploaderLoading: false})
          this.api.addMediaToThread(this.props.threadId, media)
          .then(() => this.setState({message: '', showUploader: false, media: []}))
        }}/>}
    </div>)
  }

  fetchProducts(q) {
    clearTimeout(this.requestTimer)
    this.requestTimer = setTimeout(() =>
      this.api.getUserProduct(q + '%')
      .then(r => {
        this.setState({productsSuggestion: [...r.slice(0, 10)]})
      })
    ,200)
  }

  renderMessageWritingArea() {
    const theme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    'react-autosuggest__input',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'react-autosuggest__suggestions-container',
      suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open__scrolled',
      suggestionsList:          'react-autosuggest__suggestions-list',
      suggestion:               'react-autosuggest__suggestion',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    }
    return(
    <div>
      <div className="input-group" style={{width: '100%'}}>
        <div style={{float: 'left', width: 'calc(100% - 57px)'}}>
          {this.props.currentUser.is_brand && <div>
            <Autosuggest
              theme={theme}
              alwaysRenderSuggestions={true}
              suggestions={this.state.productsSuggestion}
              onSuggestionsFetchRequested={(e) => {
                if(e.reason === 'suggestion-selected')
                  return this.setState({productsSuggestion: []})

                this.fetchProducts(e.value)
              }}
              onSuggestionsClearRequested={() => {
                if(this.state.product && this.state.product.trim().length >= 1)
                  return this.setState({productsSuggestion: []})

                this.fetchProducts('')
              }}
              getSuggestionValue={t => t.name}
              renderSuggestion={t => (<div> {t.name} </div>)}
              inputProps={{
                style: {height: 35, width: '100%'},
                placeholder: 'Products to Offer',
                value: this.state.product,
                onChange: (e, value) => this.setState({product: value.newValue})
              }}
            />
          </div>}
          <textarea
            value={this.state.message}
            onChange={e => this.setState({message: e.target.value})}
            style={{
              resize: 'none',
              minHeight: '100%'}}
            onKeyPress={(e) => e.key === 'Enter' && this.messageSend(e)}
            id="btn-input"
            className="form-control input-sm"
            placeholder="Write your message here..."/>
        </div>
        <span style={{float: 'right'}}>
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

  renderAcceptToBeSharedPhoto(recipient) {
    const hasPhoto = this.props.thread.media && this.props.thread.media.length > 0
    return(
    <div>
      <p style={{color: 'white', textAlign: 'left'}}> {'Your advice has been closed' + (hasPhoto ? `, ${recipient.full_name} asked you to share these photos on you profile. Just click on the one you want to share.`: '')} </p>
      {hasPhoto &&
        <ScrollArea
            className="area"
            contentClassName="content"
            horizontal={false}
            style={{height: '350px', width: '100%'}}
            >
            <Viewer
              largeRowCount={6}
              mediomRowCount={4}
              smallRowCount={2}
              ItemViewProps={{onClick: (m) => this.api.shareMedia(m.id)}}
              dommy={true}
              styleOverwrite={{margin: 0, width: '100%'}}
              baseItems={[...this.props.thread.media]}
              ItemView={SimpleImage}
              height={100}/>
        </ScrollArea>}
    </div>)
  }

  renderMessageCompositionArea() {
    const {thread} = this.props
    if(!thread.from)
      return
    const isFromMe = thread.from.username === this.props.currentUser.username
    const recipient = isFromMe ? thread.to : thread.from
    if(thread.status !== 'CLOSED' && thread.status !== 'RATING')
      return this.renderMessageWritingArea()

    if(isFromMe)
      return this.renderUploadphotoToBeShared(recipient)

    return this.renderAcceptToBeSharedPhoto(recipient)
  }

  renderConversationHeader() {
    const {thread} = this.props
    let showBack = window.innerWidth < 768 && this.props.threadId ? true : false

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

          {(this.props.thread.status !== 'CLOSED' && (this.props.thread.status !== 'RATING' || isFromMe)) &&
          <button
            type="button"
            aria-hidden="true"
            style={{
              marginTop: 8,
              marginLeft: '20',
              color: 'white',
              padding: 0,
              paddingRight: 5,
              fontSize: 12,
              paddingLeft: 5,
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
        <div style={{color: 'white', fontSize: 12, margin: 10, float: 'right'}}>
          {recipient.full_name} ({recipient.username})
        </div>
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
