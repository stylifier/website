import React, {Component, PropTypes} from 'react';
require('../styles/feed.scss')

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heartColor: 'white',
      heartClass: 'fa fa-heart-o fa-lg',
      loaded: false
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

  likeClicked() {
    if(this.state.heartColor === 'white')
      this.setState({
        heartColor: 'red',
        heartClass: 'fa fa-heart fa-lg'
      })
    else
      this.setState({
        heartColor: 'white',
        heartClass: 'fa fa-heart-o fa-lg'
      })
  }

  render() {
    return (
      <div
        className="containerItem"
        style={{visibility: this.state.loaded ? 'visible' : 'hidden'}}
        onClick={() => this.props.onClick && this.props.onClick(this.props.base)}>
        <img src={this.props.base.images.standard_resolution.url} style={Object.assign({width: '100%'}, this.props.styleOverwrite || {})} onClick={() => this.likeClicked()} onLoad={() => {
          this.setState({loaded: true})
          this.props.onLoaded()
        }}/>
        <div className="overlay" style={{height: '100%'}}>
          {this.props.showTag && this.props.base.usersInPhoto.map((user, i) => (
            <div key={i} style={{float: 'left'}}>
              <div className="text">
                <a href={'/profile/' + user.username}>
                <img
                  src={user.profile_picture}
                  style={{
                    marginLeft: '10px',
                    objectFit: 'cover',
                    width: '40px',
                    height: '40px',
                    float: 'left'
                  }}
                  className="img-circle"
                /></a>
              </div>
            </div>))}
          {this.props.showUser ? (<div style={{position: 'absolute', bottom: 0}} className="text"><a href={'/profile/' + this.props.base.user.username}>{this.props.base.user.username}</a></div>) : ''}
          {this.props.showLike ? (<a style={{float: 'right'}} className="btn shadowed" onClick={() => this.likeClicked()} style={{float: 'right', margin: 2, color: this.state.heartColor}}>
            <i className={this.state.heartClass}></i>
          </a>) : ''}
        </div>
      </div>
    )
  }
}

Feed.propTypes = {
  base: PropTypes.object,
  onLoaded: PropTypes.func,
  onClick: PropTypes.func,
  showUser: PropTypes.bool,
  showTag: PropTypes.bool,
  showLike: PropTypes.bool,
  styleOverwrite: PropTypes.object
}

export default Feed
