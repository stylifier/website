import React, {Component, PropTypes} from 'react';
import API from '../src/API'
import { withRouter } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader.jsx'
require('../styles/Navbar.scss')

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.emptyRender = this.props.emptyRender || false
    this.state = {
      showUploader: false,
      searchPhrase: '',
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {}
    }

    if(!this.api.token)
      return

    var OneSignal = window.OneSignal || [];
    OneSignal.push(['init', {
      appId: '32e810a8-17ec-46ce-92c8-852abd3df96f'
    }])

    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        OneSignal.getUserId().then(id => isSubscribed ?
          this.api.addSubsctiption(id) :
          this.api.removeSubsctiption(id)
        )
      });
    });

    OneSignal.push(() => OneSignal.getUserId().then(id => this.api.addSubsctiption(id)))

    this.api.fetchUserInfo()
    .then((info) => {
      localStorage.setItem('user_info', JSON.stringify(info))
      this.setState({userInfo: Object.assign({}, info)})
    })
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  searchClicked(e){
    e.preventDefault()
    this.props.history.push(`/search?username=${encodeURIComponent(this.state.searchPhrase)}&brand=${encodeURIComponent(this.state.searchPhrase)}&style=${encodeURIComponent(this.state.searchPhrase)}`)
    window.location.reload()
  }

  renderLoggedIn() {
    const profileLink = '/profile/' + this.state.userInfo.username
    return (
      <div className="navbar-collapse collapse move-me">
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <form className="form-inline" style={{margin: 9}} onSubmit={(e) => this.searchClicked(e)}>
                <input type="text" value={this.state.searchPhrase} style={{minWidth: '16em'}} onChange={e => this.setState({searchPhrase: e.target.value})} className="form-control" placeholder="Search for Style, Brand or People" aria-label="Username" aria-describedby="basic-addon1"/>
              </form>
            </li>
            {this.state.userInfo.is_brand &&
              (<li className="nav-item">
              <a className="nav-link" href="/sponsorship">Sponsorship</a>
              </li>)
            }

            <li className="nav-item">
              <a className="nav-link dropdown-toggle" href={profileLink} style={{padding: 6}}>
                <img src={this.state.userInfo.profile_picture} className="img-circle" style={{width: 40, objectFit: 'cover', height: 40}}/>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/messages">Messages</a>
            </li>
            <li className="nav-item">
              <a className="dropdown-item" href="/followers">Following</a>
            </li>
            <li className="nav-item">
              <a className="dropdown-item" href="/logout">Logout</a>
            </li>
            <li className="nav-item">
                <a href="javascript:void(0)" onClick={(e) => {
                  e.preventDefault()
                  $(".navbar-collapse").collapse('hide');
                  this.setState({showUploader:!this.state.showUploader})
                }} className="fa fa-plus fa-lg" style={{marginTop: 2,marginRight: 10, color: 'white'}}></a>
            </li>
        </ul>
      </div>
    )
  }

  renderLanding() {
    return (
      <div className="navbar-collapse collapse move-me">
        <ul className="nav navbar-nav navbar-right">
            <li><a href="/login">Register / Login</a></li>
        </ul>
      </div>
    )
  }

  getNavElements( ) {
    if(this.props.isLogedIn)
      return this.renderLoggedIn()

    return this.renderLanding()
  }

  render() {
    const navElements = this.getNavElements()
    return (
      <div>
      <div className="navbar navbar-inverse navbar-fixed-top" style={{width: '100%'}}>
        <div className="container" style={{width: '100%'}}>
            <div className="navbar-header" >
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" style={{marginTop: 4, fontFamily: "'Julius Sans One', sans-serif"}} href="/">
                  <img style={{
                      width: 30,
                      height: 30,
                      objectFit: 'cover',
                      float: 'left',
                      marginTop: -5,
                      marginRight: 10,
                      marginBottom: 0}}
                      src="/assets/img/favicon.png"/>
                  Stylifier
                </a>
            </div>
            {!this.emptyRender && navElements}
        </div>
      </div>
      <div style={{display: 'block', margin: '50px 0'}}/>
      {this.state.showUploader && <ImageUploader isPublic={true} onComplete={() => {
        this.props.history.push('/profile/' + this.state.userInfo.username)
        window.location.reload()
      }}/>}
      </div>
    )
  }
}

Navbar.propTypes = {
  isLogedIn: PropTypes.bool,
  emptyRender: PropTypes.bool,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(Navbar)
