import React, {Component, PropTypes} from 'react'

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
    // const href = '/profile/' + this.props.base.username.toString()
    return (
      <div className="containerItem" style={{width: '100%'}}>
        <a href="sldjhfk" style={{width: '100%', display: 'block',border: '1px solid black', padding: 10}} onClick={(e) => {
          e.preventDefault()
          this.props.onClick(this.props.base)
        }}>
        <div>{this.props.base.to.username === this.props.currentUserUsername ? 'from: ' + this.props.base.from.username : 'to: ' + this.props.base.to.username}</div>
        <div>{this.props.base.createdAt}</div>
        </a>
      </div>
    )
  }
}

ProfileImage.propTypes = {
  base: PropTypes.object,
  onClick: PropTypes.func,
  currentUserUsername: React.PropTypes.string
}

export default ProfileImage
