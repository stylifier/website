import React, {Component, PropTypes} from 'react'
import SimpleImage from './SimpleImage.jsx'
require('../styles/Messages.scss')


class ConversationItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedItemCounts: 0,
      loaded: false
    }
  }

  refreshStats() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    if(!this.state.loaded && this.props.base.media.length === this.state.loadedItemCounts)
      this.props.onLoaded && setTimeout(() => this.props.onLoaded(), 100)

    const fromMe = this.props.currentUserUsername === this.props.base.from
    const border = fromMe ? '15px 15px 15px 3px' : '15px 15px 3px 15px'
    return (
      <div
        style={{
          width: 'auto',
          maxWidth: '80%',
          color: 'darkblue',
          display: 'inline-block',
          backgroundColor: 'white',
          borderRadius: border,
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          float: fromMe ? 'left' : 'right'
        }}>
          {this.props.base.text.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
          {this.props.base.media.map((o, i) => <SimpleImage key={i} style={{marginBottom: 10}} onLoaded={() => this.setState({loadedItemCounts: this.state.loadedItemCounts + 1})} base={o}/>)}
        <div id="footer" style={{fontSize: '.8em', margin: 0, padding: 0}}>
          {this.props.base.createdAt}
        </div>
      </div>
    )
  }
}

ConversationItem.propTypes = {
  base: PropTypes.object,
  currentUserUsername: React.PropTypes.string,
  onLoaded: React.PropTypes.func
}

export default ConversationItem
