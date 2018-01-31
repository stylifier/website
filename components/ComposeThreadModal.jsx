import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Autocomplete from 'react-autocomplete'
import ImageUploader from '../components/ImageUploader.jsx'
import API from '../src/API'

class ComposeThreadModal extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.state = {
      recipientUsername: this.props.defaultValue ? this.props.defaultValue + '' : '',
      hasDefault: this.props.defaultValue ? true : false,
      followersSuggestionList: [],
      media: [],
      uploaderLoading: false,
      sendButtonDisabled: false,
      send: false,
      message: ''
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

  renderAutoComplete() {
    return (<div className="dropdown" style={{width: '70%'}}>
      <Autocomplete
        value={this.state.recipientUsername}
        inputProps={{
          style: {width: '100%'},
          placeholder: 'to brand or people you follow',
          id:'dropdownMenu2',
          'data-toggle':'dropdown',
          'aria-haspopup':'true' ,
          'aria-expanded':'false',
          disabled: this.state.hasDefault ? 'disabled' : ''
        }}
        wrapperStyle={{ position: 'relative', width: '100%', display: 'inherit'}}
        items={this.state.followersSuggestionList}
        getItemValue={(item) => item.name}
        onSelect={(value, state) => this.setState({recipientUsername: value, followersSuggestionList: [state] }) }
        onChange={(event, value) => {
          this.setState({ value, loading: true, followersSuggestionList: [] , recipientUsername: value})
          clearTimeout(this.requestTimer)
          this.requestTimer = setTimeout(() =>
            this.api.fetchUserFollowers(this.props.currentUser.username, 0, value + '%')
            .then(r => {
              this.setState({
                followersSuggestionList: [...r.data.map(i => ({name: i.username}))],
                loading: false
              })
            }
            )
          ,200)
        }}
        renderItem={(item, isHighlighted) => (
          <div
            className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
            key={item.abbr}
          >{item.name}</div>
        )}
        renderMenu={(items, value) => {
          return (
          <div className="dropdown-menu" style={{width: '100%', backgroundColor: 'white', color: 'black'}} aria-labelledby="dropdownMenu2">
            {value === '' ? (
              <div className="dropdown-item">brand or people you follow</div>
            ) : this.state.loading ? (
              <div className="dropdown-item">loading...</div>
            ) : items.length === 0 ? (
              <div className="dropdown-item">no matches for {value}</div>
            ) : items.map((i, t) => [(<div key={t} className="dropdown-item">{i.name}</div>), i])}
          </div>
        )}}
      />
    </div>)
  }

  render() {
    return (
      <div
      id="openingThreadModal"
      style={{position: 'fixed', top: 0, textAlign: 'center', left: 0, width: '100%', height: '100%'}}
      className="modal modal-dialog fade"
      role="dialog"
      aria-labelledby="openingThreadModalLabel"
      aria-hidden="true">
        <div className="modal-content" style={{position: 'relative', margin: 'auto', width: 800, height: 550, maxHeight: '100%', maxWidth: '100%'}}>
          <div className="modal-header">
            <a type="button" className="close" data-dismiss="modal" aria-hidden="true">×</a>
            {this.renderAutoComplete()}
          </div>
          <div className="modal-body">
          <div>
            <div className="input-group" style={{width: '100%'}}>
              <textarea
                value={this.state.message}
                onChange={e => this.setState({message: e.target.value})}
                style={{width: '100%', resize: 'none', minHeight: '100%'}}
                onKeyPress={(e) =>
                  e.key === 'Enter' && this.messageSend(e)
                }
                id="btn-input"
                className="form-control input-sm"
                placeholder="Write your message here..." />
            </div>
            <ImageUploader
              isPublic={false}
              onSubmit={() => this.setState({uploaderLoading: true})}
              onComplete={(media) => this.setState({uploaderLoading: false, media: media})}/>
          </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={(e) => {
                e.preventDefault()
                this.setState({send: true, sendButtonDisabled: true})
              }}
              className="btn btn-primary"
              disabled={this.state.sendButtonDisabled}>

              Ask for advice
            </button>
          </div>
        </div>
    </div>)
  }
}

ComposeThreadModal.propTypes = {
  defaultValue: React.PropTypes.string,
  currentUser: React.PropTypes.object,
  onClose: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ComposeThreadModal)
