import React, {Component, PropTypes} from 'react'
import API from '../API'
import Autosuggest from 'react-autosuggest'
import {connect} from 'react-redux'
import actions from '../actions'
import ColorItem from './ColorItem.jsx'
import Viewer from './Viewer.jsx'
require('../styles/feed.scss')

const mapStateToProps = (state) => {
    return {
        imageDetails : state.imageDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openImageDetails: (base) =>
          dispatch((actions.openImageDetails(base))),
        closeImageDetails: () =>
          dispatch((actions.closeImageDetails()))
    }
};

class SimpleImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.showDetailsIcon && this.props.openImageDetails(this.props.base)
  }

  renderStyleArea() {
    const {base, currentUser, showStyleEditor, stylesSuggestions} = this.state
    const isMe = base.user ? base.user.username.toLowerCase() === currentUser.username.toLowerCase() : false

    if (base.style && !showStyleEditor) {
      if(isMe)
        return (<a className="btn shadowed" onClick={(e) => {
          e.preventDefault()
          this.setState({showStyleEditor: true, style: base.style})
        }} style={{position: 'absolute', top: 0, left: 0, color: 'white', margin: 10, backgroundColor: 'rgba(0,0,0, 0.6)', borderRadius: 10}}>
          {base.style}
        </a>)

      return (<a className="btn shadowed" href={`/search?style=${base.style}`} style={{position: 'absolute', top: 0, left: 0, color: 'white', margin: 10, backgroundColor: 'rgba(0,0,0, 0.6)', borderRadius: 10}}>
        {base.style}
      </a>)
    }


    if (isMe) {
      return showStyleEditor ?
      (
        <form className="form-inline" style={{position: 'absolute', top: 0, left: 0, color: 'black', margin: 10}} onSubmit={(e) => {
          e.preventDefault()
          this.api.setStyle(base.id, this.state.style.toLowerCase())
          .then(() => this.setState({showStyleEditor: false, base: Object.assign({}, base, {style: this.state.style})}))
          .catch(() => this.setState({showStyleEditor: false}))
        }}>
          <div className="input-group">
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
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary mb-2">Add</button>
            </span>
          </div>
        </form>
      ) :
      (<a className="btn shadowed" onClick={() => this.setState({showStyleEditor: true})} style={{position: 'absolute', top: 0, left: 0, color: 'black', margin: 10, backgroundColor: 'lightGray', borderRadius: 10}}>
        + add a style
      </a>)
    }
  }

  render() {
    const {onClick, styleOverwrite, onLoaded, showTag, showUser, showDetailsIcon, hideStyle, showMakeProfilePicture} = this.props
    const {currentUser, loaded, base} = this.state
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
        {showDetailsIcon ? (<a className="btn shadowed" onClick={() => this.likeClicked()} style={{position: 'absolute', top: 0, right: 0, margin: 2, color: 'white'}}>
          <i className='fa fa-ellipsis-h fa-lg'></i>
        </a>) : ''}

        {!hideStyle && this.renderStyleArea()}

        {this.props.showColorPallet && base.colorCode && base.colorCode.length > 0 && <Viewer
          largeRowCount={5}
          mediomRowCount={5}
          smallRowCount={5}
          ItemView={ColorItem}
          styleOverwrite={{margin: 5}}
          ItemViewProps={{
            onClick:(t) => this.props.onColorClick && this.props.onColorClick(t)
          }}
          dommy={true}
          baseItems={base.colorCode.match(/.{1,6}/g)}/>}
      </div>
    )
  }
}

SimpleImage.propTypes = {
  base: PropTypes.object,
  onLoaded: PropTypes.func,
  onClick: PropTypes.func,
  onColorClick: PropTypes.func,
  showUser: PropTypes.bool,
  showTag: PropTypes.bool,
  showDetailsIcon: PropTypes.bool,
  hideStyle: PropTypes.bool,
  closeImageDetails: PropTypes.func,
  openImageDetails: PropTypes.func,
  showMakeProfilePicture: PropTypes.bool,
  showColorPallet: PropTypes.bool,
  styleOverwrite: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleImage)
