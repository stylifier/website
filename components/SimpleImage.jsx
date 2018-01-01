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
    const apiUrl = 'https://mock.stylifier.com/'
    const href = '/profile/' + this.props.base.owner.toString()
    const img = apiUrl + 'images/' + this.props.base.id.toString() + '_thumbnail.jpeg'
    return (
      <div className="containerItem" style={{visibility: this.state.loaded ? 'visible' : 'hidden'}}>
        <img src={img} style={{width: '100%'}} onClick={() => this.likeClicked()} onLoad={() => {
          this.setState({loaded: true})
          this.props.onLoaded()
        }}/>
        <div className="overlay">
          {this.props.showUser ? (<div className="text"><a href={href}>{this.props.base.owner}</a></div>) : ''}
          {this.props.showLike ? (<a className="btn shadowed" onClick={() => this.likeClicked()} style={{float: 'right', margin: 2, color: this.state.heartColor}}>
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
  showUser: PropTypes.bool,
  showLike: PropTypes.bool
}

export default Feed
