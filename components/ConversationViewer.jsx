import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ConversationItem from './ConversationItem.jsx'
import Viewer from './Viewer.jsx'


class Conversation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div style={{maxHeight: '100%', overflowY: 'auto'}}>
          <Viewer
            className="btn-group-vertical"
            role="group"
            largeRowCount={1}
            mediomRowCount={1}
            smallRowCount={1}
            styleOverwrite={{margin: 0}}
            fetcher={() => this.props.fetcher()}
            baseItems={this.props.messages}
            ItemView={ConversationItem}
            ItemViewProps={{
              currentUserUsername: this.props.currentUser.username,
              onUpdateParent: () => {
                this.forceUpdate()
                setTimeout(() => this.forceUpdate(), 500)
                setTimeout(() => this.forceUpdate(), 1000)
                setTimeout(() => this.forceUpdate(), 1500)
              }
            }}
          />
        </div>
      </div>
    )
  }
}

Conversation.propTypes = {
  messages: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  query: React.PropTypes.string,
  fetcher: React.PropTypes.func
}

export default withRouter(Conversation)
