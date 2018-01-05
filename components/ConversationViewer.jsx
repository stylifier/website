import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ConversationItem from './ConversationItem.jsx'
import ViewerScrolled from './ViewerScrolled.jsx'


class Conversation extends Component {
  constructor(props) {
    super(props)
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
        fetcher={() => this.props.fetcher()}
        baseItems={this.props.messages}
        ItemView={ConversationItem}
        height={this.props.height}
        ref={ref => this.viewer = ref}
        ItemViewProps={{
          currentUserUsername: this.props.currentUser.username,
          onLoaded: () => {
            this.forceUpdate()
            this.viewer.keepAtBottom()
          }
        }}
      />
    )
  }
}

Conversation.propTypes = {
  messages: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  height: React.PropTypes.string,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  query: React.PropTypes.string,
  fetcher: React.PropTypes.func
}

export default withRouter(Conversation)
