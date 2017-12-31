import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'
import Viewer from './Viewer.jsx'


class ThreadsViewer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div style={{height: '100%', display: 'block', overflowY: 'auto', position: 'fix'}}>
          <Viewer
            largeRowCount={1}
            mediomRowCount={1}
            smallRowCount={1}
            styleOverwrite={{margin: 0}}
            fetcher={() => this.props.fetcher.fetchThreads()}
            baseItems={this.state.users}
            ItemView={ThreadItem}
            ItemViewProps={{
              onClick:(i) => {
                this.props.history.push('/messages/' + i.id)
              },
              currentUserUsername: this.state.currentUser.username
            }}
          />
        </div>
      </div>
    )
  }
}

ThreadsViewer.propTypes = {
  users: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  phrase: React.PropTypes.string,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  location: React.PropTypes.object,
  query: React.PropTypes.string,
  fetcher: React.PropTypes.func
}

export default withRouter(ThreadsViewer)
