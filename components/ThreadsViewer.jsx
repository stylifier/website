import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'
import Viewer from './Viewer.jsx'


class ThreadsViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div style={{maxHeight: 'calc(100% - 40px)', overflowY: 'auto'}}>
          <Viewer
            className="btn-group-vertical"
            role="group"
            largeRowCount={1}
            mediomRowCount={1}
            smallRowCount={1}
            styleOverwrite={{margin: 0}}
            fetcher={() => this.props.fetcher()}
            component="div"
            gutter={0}
            ItemView={ThreadItem}
            ref={ref => !this.state.viewer && this.setState({viewer: ref})}
            ItemViewProps={{
              onClick:(i) => {
                this.props.history.push('/messages/' + i.id + (this.props.query ? `?query=${encodeURIComponent(this.props.query)}` : ''))
              },
              currentUserUsername: this.props.currentUser.username,
              activeThreadId: this.props.threadId
            }}
          />
        </div>
      </div>
    )
  }
}

ThreadsViewer.propTypes = {
  threads: React.PropTypes.array,
  currentUser: React.PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired,
  query: React.PropTypes.string,
  threadId: React.PropTypes.string,
  fetcher: React.PropTypes.func
}

export default withRouter(ThreadsViewer)
