import React, {Component, PropTypes} from 'react'
import API from './API'
import { withRouter } from 'react-router-dom'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loginDisabled: false
    }
    this.api = new API()
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  loginClicked(e) {
    this.setState({loginDisabled: true})
    e.preventDefault()

    this.api.login(this.state.username, this.state.password)
    .then((token) => {
      localStorage.setItem('user_token', token)
      this.props.history.push('/')
    })
    .catch(() => {
      this.setState({loginDisabled: false})
    })
  }

  render() {
    return (
      <form onSubmit={(e) => this.loginClicked(e)}>
        <h2>Already have an account</h2>
        <div className="form-group">
          <label htmlFor="loginUsername">User Name</label>
          <input className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})} id="loginUsername" placeholder="Enter your desired username"/>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} className="form-control" id="loginPassword" placeholder="Password"/>
          <small id="loginPassword" className="form-text text-muted">Your password must be more that 8 letter long.</small>
        </div>
        <button type="submit" value="submit" disabled={this.state.loginDisabled} className="btn btn-default">Login</button>
      </form>
    )
  }
}

LoginComponent.propTypes = {
  isLogedIn: PropTypes.bool,
  api: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(LoginComponent)
