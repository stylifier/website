import React, {Component, PropTypes} from 'react'
import SimpleImage from './SimpleImage.jsx'

class ColorItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  resize(){
    this.render()
  }

  unlikeClicked() {
    const { base } = this.props
    this.props.unlikeClicked && this.props.unlikeClicked(base)
  }

  likeClicked() {
    const { base } = this.props
    this.props.likeClicked && this.props.likeClicked(base)
  }

  render() {
    const { showAdminMenu, base } = this.props
    const username = base.creator_username
    const popularity = base.popularity
    return (
      <div
        style={{
          width: '100%',
          margin: 0,
          // height: (this.props.base && this.props.base.media && this.props.base.media[0]) ? 427 : 200,
          boxShadow: '0px 1px 5px 1px gray',
          borderRadius: 4
        }}>
        {
          this.props.base && this.props.base.media && this.props.base.media[0] &&
          (<SimpleImage
            hideStyle={true}
            key={this.props.base.id}
            styleOverwrite={{marginBottom: 5, borderRadius: 5}}
            onLoaded={() => this.setState({loadedItemCounts: this.state.loadedItemCounts + 1})}
            base={this.props.base.media[0]}
          />)
        }
        {this.props.base.code.match(/.{1,6}/g).map((c, i) => {
          return (
            <div
              key={i}
              style={{
                width: '100%',
                margin: 0,
                height: 50,
                color: 'white',
                backgroundColor: '#' + c
              }}>
            </div>
          )
        })}
        {popularity && <div style={{ position: 'absolute', top: 0, left: 0 }}
         className="text"><a>rating: {popularity}/5</a></div>}
        {username && <div style={{ position: 'absolute', bottom: 0, right: 0 }} className="text"><a href={'/profile/' + username}>@{username.slice(0, 15)}{ username.length > 15 ? '...': ''}</a></div>}
        {showAdminMenu && <a onClick={() => this.unlikeClicked()} style={{ position: 'absolute', top: 10, right: 10 }}><i style={{ color: 'white', textShadow: '0px 0px 10px #000000, 0px 0px 10px #000000' }} className='fa fa-thumbs-down fa-lg'></i></a>}
        {showAdminMenu && <a onClick={() => this.likeClicked()} style={{ position: 'absolute', top: 10, right: 40 }}><i style={{ color: 'white', textShadow: '0px 0px 10px #000000, 0px 0px 10px #000000' }} className='fa fa-thumbs-up fa-lg'></i></a>}
      </div>
    )
  }
}

ColorItem.propTypes = {
  base: PropTypes.object,
  showAdminMenu: PropTypes.bool,
  unlikeClicked: PropTypes.func,
  likeClicked: PropTypes.func
}

export default ColorItem
