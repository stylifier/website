import React, {Component, PropTypes} from 'react'
import SimpleImage from './SimpleImage.jsx'
import moment from 'moment'
import ProductsItem from './ProductsItem.jsx'
require('../styles/Messages.scss')


class ConversationItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedItemCounts: 0
    }
    this.loaded = false
  }

  refreshStats() {
  }



  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    if(!this.loaded &&
      (this.props.base.media.length === this.state.loadedItemCounts || this.props.base.media.length === 0)) {
      this.loaded = true
      this.props.onLoaded && this.props.onLoaded()
    }
  }

  render() {
    const fromMe = this.props.currentUserUsername === this.props.base.senderUsername
    const border = !fromMe ? '15px 15px 15px 3px' : '15px 15px 3px 15px'
    return (
      <div
        style={{
          width: 'auto',
          maxWidth: '80%',
          color: 'black',
          display: 'block',
          backgroundColor: 'white',
          borderRadius: border,
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          marginLeft: fromMe ? 'auto' : '0'
        }}>
          {this.props.base.text.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
          {this.props.base.media.map((o, i) => <SimpleImage hideStyle={true} key={i} styleOverwrite={{marginBottom: 5, borderRadius: 5}} onLoaded={() => this.setState({loadedItemCounts: this.state.loadedItemCounts + 1})} base={o}/>)}

          {this.props.base.products.map((o, i) => <ProductsItem key={i} styleOverwrite={{paddingBottom: 10, borderRadius: 5}} base={o}/>)}

        <div id="footer" style={{fontSize: '.8em', margin: 0, padding: 0}}>
          {moment(this.props.base.created_time).fromNow()}
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
