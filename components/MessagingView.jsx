import React, {Component, PropTypes} from 'react'

class MessagingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  refreshStats() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize(){
    this.render()
  }

  render() {
    return (
      <div className="containerItem" style={{height: '100%', display: 'block', overflowY: 'auto', position: 'fix', width: '100%', backgroundColor: 'blue', marginTop: 20}}>
      {this.props.threadId}
      </div>
    )
  }
}

MessagingView.propTypes = {
  threadId: PropTypes.string
}

export default MessagingView
