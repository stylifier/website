import React, {Component, PropTypes} from 'react';
require('../styles/Navbar.scss')

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.emptyRender = this.props.emptyRender || false
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  getNavElements( ) {
    if(this.props.isLogedIn)
      return (
        <div className="navbar-collapse collapse move-me">
          <ul className="nav navbar-nav navbar-right">
              <li><a href="/logout">logout</a></li>
          </ul>
        </div>
      )

    return (
      <div className="navbar-collapse collapse move-me">
        <ul className="nav navbar-nav navbar-right">
            <li><a href="/login">Register / Login</a></li>
        </ul>
      </div>
    )
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
      <div style={{display: 'block', margin: '30px 0'}}/>
      </div>
    )
  }
}

Navbar.propTypes = {
  isLogedIn: PropTypes.bool,
  emptyRender: PropTypes.bool
}

export default Navbar
