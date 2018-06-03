import React, {Component, PropTypes} from 'react'
import API from '../API'
import Autosuggest from 'react-autosuggest'
require('../styles/feed.scss')

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heartColor: 'white',
      heartClass: 'fa fa-heart-o fa-lg',
      loaded: false,
      showStyleEditor: false,
      stylesSuggestions: [],
      style: '',
      currentUser: JSON.parse(localStorage.getItem('user_info')),
      base: Object.assign({}, this.props.base)
    }
    this.api = new API()
  }

  refreshStats() {
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.showStyleEditor && !this.state.base.style && nextState.showStyleEditor !== this.state.showStyleEditor) {
      this.api.getStyles()
      .then(s => this.setState({stylesSuggestions: [...s]}))
    }
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
        heartClass: 'fa fa-heart fa-lg',
        showStyleEditor: false
      })
    else
      this.setState({
        heartColor: 'white',
        heartClass: 'fa fa-heart-o fa-lg',
        showStyleEditor: false
      })
  }

  renderStyleArea() {
    const {base, currentUser, showStyleEditor, stylesSuggestions} = this.state
    const style = {position: 'absolute', top: 0, left: 0, color: 'black', margin: 10, backgroundColor: 'lightGray', borderRadius: 20}
    const isMe = base.user ? base.user.username.toLowerCase() === currentUser.username.toLowerCase() : false

    if (base.style && !showStyleEditor) {
      if(isMe)
        return (<a className="btn shadowed" onClick={(e) => {
          e.preventDefault()
          this.setState({showStyleEditor: true, style: base.style})
        }} style={Object.assign(style, {color: 'white', backgroundColor: 'blue'})}>
          {base.style}
        </a>)

      return (<a className="btn shadowed" href={`/search?style=${base.style}`} style={Object.assign(style, {color: 'white', backgroundColor: 'blue'})}>
        {base.style}
      </a>)
    }


    if (isMe) {
      return showStyleEditor ?
      (
        <form className="form-inline" style={style} onSubmit={(e) => {
          e.preventDefault()
          this.api.setStyle(base.id, this.state.style.toLowerCase())
          .then(() => this.setState({showStyleEditor: false, base: Object.assign({}, base, {style: this.state.style})}))
          .catch(() => this.setState({showStyleEditor: false}))
        }}>
          <div className="form-group mx-sm-3 mb-2">
            <Autosuggest
              alwaysRenderSuggestions={true}
              suggestions={stylesSuggestions}
              onSuggestionsFetchRequested={(value) => {
                this.api.getStyles(value.value).then(s => this.setState({stylesSuggestions: [...s]}))}
              }
              onSuggestionsClearRequested={() => {
                if(this.state.style.trim().length >= 1)
                  return this.setState({stylesSuggestions: []})

                return this.api.getStyles().then(s => this.setState({stylesSuggestions: [...s]}))
              }}
              getSuggestionValue={t => t}
              renderSuggestion={t => (<div> {t} </div>)}
              inputProps={{
                style: {height: 35},
                placeholder: 'Vintage, Tomboy ...',
                value: this.state.style,
                onChange: (e, value) => this.setState({style: value.newValue})
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">+</button>
        </form>
      ) :
      (<a className="btn shadowed" onClick={() => this.setState({showStyleEditor: true})} style={style}>
        + add a style
      </a>)
    }
  }

  render() {
    const {onClick, styleOverwrite, onLoaded, showTag, showUser, showLike, hideStyle, showMakeProfilePicture} = this.props
    const {currentUser, loaded, base,heartColor, heartClass} = this.state
    const isMe = base.user ? base.user.username.toLowerCase() === currentUser.username.toLowerCase() : false

    const showSetProfilePic = showMakeProfilePicture && isMe && !this.state.currentUser.is_instagram_user && !this.state.currentUser.is_pinterest_user && this.state.currentUser.profile_picture !== base.images.standard_resolution.url

    return (
      <div
        className="containerItem"
        style={{visibility: loaded ? 'visible' : 'hidden'}}
        onClick={() => onClick && onClick(base)}>
        <img src={base.images.standard_resolution.url} style={Object.assign({width: '100%'}, styleOverwrite || {})} onClick={() => this.likeClicked()} onLoad={() => {
          this.setState({loaded: true})
          onLoaded()
        }}/>

        {showTag && base.usersInPhoto.map((user, i) => (
          <div key={i} style={{float: 'left'}}>
            <div className="text" style={{
              bottom: 0,
              right: 0,
              position: 'absolute'
            }}>
              <a href={'/profile/' + user.username}>
              <img
                src={user.profile_picture}
                style={{
                  marginLeft: '10px',
                  objectFit: 'cover',
                  width: '40px',
                  height: '40px'
                }}
                className="img-circle"
              /></a>
            </div>
          </div>))}
        {showUser ? (<div style={{position: 'absolute', bottom: 0}} className="text"><a href={'/profile/' + base.user.username}>{base.user.username}</a></div>) : ''}
        {showSetProfilePic ? (<a className="btn shadowed" onClick={() => this.api.setProfilePicture(base).then(() => window.location.reload())} style={{position: 'absolute', bottom: 0, left: 0, color: 'white', margin: 10, backgroundColor: 'blue', borderRadius: 10}}>
          Set as your profile picture
        </a>): ''}
        {showLike ? (<a className="btn shadowed" onClick={() => this.likeClicked()} style={{position: 'absolute', top: 0, right: 0, margin: 2, color: heartColor}}>
          <i className={heartClass}></i>
        </a>) : ''}

        {!hideStyle && this.renderStyleArea()}
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
  hideStyle: PropTypes.bool,
  showMakeProfilePicture: PropTypes.bool,
  styleOverwrite: PropTypes.object
}

export default Feed
