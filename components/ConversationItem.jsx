import React, {Component, PropTypes} from 'react'
import SimpleImage from './SimpleImage.jsx'
import Viewer from './Viewer.jsx'
import Promise from 'bluebird'
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

  resize(){
    this.render()
  }

  render() {
    const fromMe = this.props.currentUserUsername === this.props.base.from
    const border = fromMe ? '15px 15px 15px 3px' : '15px 15px 3px 15px'
    return (
      <div
        style={{
          width: 'auto',
          maxWidth: '80%',
          margin: 0,
          color: 'darkblue',
          display: 'inline-block',
          backgroundColor: 'white',
          borderRadius: border,
          paddingLeft: 10,
          paddingRight: 10,
          float: fromMe ? 'left' : 'right'
        }}>
        {this.props.base.text.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
        <Viewer
          fetcher={() => Promise.resolve([])}
          ItemView={SimpleImage}
          baseItems={this.props.base.assets}
          largeRowCount={2}
          mediomRowCount={1}
          smallRowCount={1}
          onLoaded={() => {
            this.forceUpdate()
            this.props.onUpdateParent()
          }}
          />
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
  onLoaded: React.PropTypes.func,
  onUpdateParent: React.PropTypes.func
}

export default ProfileImage
