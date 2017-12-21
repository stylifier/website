import React, {Component, PropTypes} from 'react'
import LoginComponent from './LoginComponent.jsx'
import CreateUserComponent from './CreateUserComponent.jsx'


class Login extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
    <div id="home-sec" className="container" style={{overflow: 'hidden', paddingTop: 100, paddingBottom: 100}}>
      <div className="row clr-white" >
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{borderRight: '1px solid black', paddingRight: 40}}>
          <CreateUserComponent/>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <LoginComponent/>
        </div>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  tt: PropTypes.bool
}

export default Login
