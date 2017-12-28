import React, {Component, PropTypes} from 'react';
import API from '../src/API'
require('../styles/Navbar.scss')

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.emptyRender = this.props.emptyRender || false
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('user_info'))
    }

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
  }

  renderLoggedIn() {
    const profileLink = '/profile/' + this.state.userInfo.username
    return (
      <div className="navbar-collapse collapse move-me">
        <ul className="nav navbar-nav navbar-right">
            <li>
              <form className="form-inline" style={{margin: 9}} onSubmit={(e) => this.searchClicked(e)}>
                <div className="input-group">
                  <span className="input-group-addon" id="basic-addon1">@</span>
                  <input type="text" className="form-control" placeholder="brand/people" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </form>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">messages</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{padding: 6}}>
                {this.state.userInfo.firstName}
                <img src={this.state.userInfo.avatar} className="img-circle" style={{width: 40, objectFit: 'cover', height: 40, marginLeft: 10}}/>
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href={profileLink}>profile</a>
                <br/>
                <a className="dropdown-item" href="/followers">followers</a>
                <div className="divider"></div>
                <a className="dropdown-item" href="/logout">logout</a>
              </div>
            </li>
            <li className="nav-item">
                <a className="fa fa-plus fa-lg" style={{marginTop: 5,marginRight: 10, color: 'white'}}></a>
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
                <a className="navbar-brand" href="/">Stylifier</a>
            </div>
            {!this.emptyRender && navElements}
        </div>
      </div>
      <div style={{display: 'block', margin: '50px 0'}}/>
      </div>
    )
  }
}

Navbar.propTypes = {
  isLogedIn: PropTypes.bool,
  emptyRender: PropTypes.bool
}

export default Navbar
