import React, {Component, PropTypes} from 'react'
import SimpleImage from './SimpleImage.jsx'
require('../styles/Messages.scss')


class ProfileImage extends Component {
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

  render() {
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
          {this.props.base.media.map(i => <SimpleImage style={{marginBottom: 10}} base={i}/>)}
        <div id="footer" style={{fontSize: '.8em', margin: 0, padding: 0}}>
          {this.props.base.createdAt}
        </div>
      </div>
    )
  }
}

ProfileImage.propTypes = {
  base: PropTypes.object,
  currentUserUsername: React.PropTypes.string,
  onLoaded: React.PropTypes.func
}

export default ProfileImage
