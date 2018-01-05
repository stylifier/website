import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ConversationItem from './ConversationItem.jsx'
import ViewerScrolled from './ViewerScrolled.jsx'
import Promise from 'bluebird'
import API from '../src/API'


class Conversation extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
  }

  fetcher() {
    if(this.messagePagination === '')
      return Promise.resolve([])

    return this.api.fetchMessages(this.props.threadId, this.messagePagination)
    .then((res) => {
      this.messagePagination = res.pagination
      return res.data.reverse()
    })
  }

  render() {
    return (
      <ViewerScrolled
        className="btn-group-vertical"
        role="group"
        largeRowCount={1}
        mediomRowCount={1}
        smallRowCount={1}
        styleOverwrite={{margin: 0}}
        onLoaded={() => {
          setTimeout(() => this.viewer.keepAtBottom(), 70)
          this.props.onLoaded && this.props.onLoaded()
        }}
        fetcher={() => this.fetcher()}
        baseItems={this.props.messages}
        ItemView={ConversationItem}
        height={this.props.height}
        ref={ref => this.viewer = ref}
        ItemViewProps={{
          currentUserUsername: this.props.currentUser.username
        }}
      />
    )
  }
}

Conversation.propTypes = {
  messages: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  height: React.PropTypes.string,
  onLoaded: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  query: React.PropTypes.string,
  threadId: React.PropTypes.string
}

export default withRouter(Conversation)
