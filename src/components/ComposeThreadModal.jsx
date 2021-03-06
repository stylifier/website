import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader.jsx'
import Autosuggest from 'react-autosuggest'
import {connect} from 'react-redux'
import API from '../API'
import Viewer from './Viewer.jsx'
import SimpleImage from './SimpleImage.jsx'
import actions from '../actions'

class ComposeThreadModal extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    const {threadCreator} = props
    const {defaultValue} = threadCreator

    this.state = {
      recipientUsername: defaultValue ? defaultValue + '' : '',
      hasDefault: defaultValue ? true : false,
      followersSuggestionList: [],
      media: threadCreator.media || [],
      uploaderLoading: false,
      sendButtonDisabled: false,
      send: false,
      message: '',
      value: ''
    }
  }

  componentDidMount() {
    $('#openingThreadModal').modal('show')
    $('#openingThreadModal').on('hidden.bs.modal', () => this.props.onClose())
  }

  componentDidUpdate() {
    if (this.state.send && !this.state.uploaderLoading) {
      this.api.createThread(this.state.recipientUsername)
      .then(r => this.api.createMessage(r.id, this.state.message, this.state.media).then(() => r))
      .then(r => {
        this.setState({send: false})
        this.props.history.push('/messages/' + r.id)
        window.location.reload()
      })
      .catch(() => this.setState({sendButtonDisabled: false, send: false}))
    }
  }

  fetchRecipients(q) {
    clearTimeout(this.requestTimer)
    this.requestTimer = setTimeout(() =>
      this.api.fetchUserFollowers(this.props.currentUser.username, 0, q + '%')
      .then(r => this.setState({followersSuggestionList: [...r.data.map(i => ({name: i.username})).map(i => i.name).slice(0, 10)]}))
    ,200)
  }

  renderAutoComplete() {
    return (
      <div className="dropdown" style={{width: '100%', textAlign: 'left', zIndex: 1000, marginBottom: 20}}>
        <div className="input-group">
          <Autosuggest
            alwaysRenderSuggestions={true}
            suggestions={this.state.followersSuggestionList}
            onSuggestionsFetchRequested={(e) => {
              if(e.reason === 'suggestion-selected')
                return this.setState({followersSuggestionList: []})

              this.fetchRecipients(e.value)
            }}
            onSuggestionsClearRequested={() => {
              if(this.state.recipientUsername && this.state.recipientUsername.trim().length >= 1)
                return this.setState({followersSuggestionList: []})

              this.fetchRecipients('')
            }}
            getSuggestionValue={t => t}
            renderSuggestion={t => (<div> {t} </div>)}
            inputProps={{
              style: {height: 35, width: '100%'},
              placeholder: 'Recipient',
              value: this.state.recipientUsername,
              onChange: (e, value) => this.setState({recipientUsername: value.newValue})
            }}
          />
          <span className="input-group-btn">
            <button
              onClick={(e) => {
                e.preventDefault()
                this.setState({send: true, sendButtonDisabled: true})
              }}
              className="btn btn-primary"
              disabled={this.state.sendButtonDisabled}>

              Ask for Advice
            </button>
          </span>
        </div>
    </div>)
  }

  render() {
    const {media} = this.props.threadCreator
    return (
      <div
      id="openingThreadModal"
      style={{position: 'fixed', top: 0, textAlign: 'center', left: 0, width: '100%', height: '100%', maxWidth: '95%'}}
      className="modal modal-dialog fade"
      role="dialog"
      aria-labelledby="openingThreadModalLabel"
      aria-hidden="true">
        <div className="modal-content" style={{position: 'relative', margin: 'auto', width: 800, height: 'auto', maxHeight: '100%', maxWidth: '100%'}}>
          <div className="modal-header">
            <h4 style={{float: 'left'}}>Ask for Advice</h4>
            <button
              className="btn btn-danger" style={{float: 'right'}}
              data-dismiss="modal">
              X
            </button>
          </div>
          <div className="modal-body">
            {this.renderAutoComplete()}
            <div>
              <div className="input-group" style={{width: '100%'}}>
                <textarea
                  value={this.state.message}
                  onChange={e => this.setState({message: e.target.value})}
                  style={{width: '100%', resize: 'none', minHeight: '100%', marginBottom: 20}}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && this.messageSend(e)
                  }
                  id="btn-input"
                  className="form-control input-sm"
                  placeholder="Write your message here..." />
              </div>
              {media ? <Viewer
                largeRowCount={1}
                mediomRowCount={1}
                smallRowCount={1}
                dommy={true}
                styleOverwrite={{maxWidth: '100%', width: '100%'}}
                baseItems={[...media]}
                ItemView={SimpleImage}/> :
              <ImageUploader
                isPublic={false}
                onSubmit={() => this.setState({uploaderLoading: true})}
                onComplete={(media) => this.setState({uploaderLoading: false, media: media})}/>}
            </div>
          </div>
        </div>
    </div>)
  }
}

ComposeThreadModal.propTypes = {
  onClose: React.PropTypes.func,
  currentUser: React.PropTypes.object,
  threadCreator: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(
  connect(
    (state) => ({
      threadCreator : state.threadCreator,
      currentUser : state.user}),
    (dispatch) => ({
      onClose: () =>
        dispatch((actions.closeThreadCreator()))
    })
  )(ComposeThreadModal))
