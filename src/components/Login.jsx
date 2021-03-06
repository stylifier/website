import React, {Component, PropTypes} from 'react'
import API from '../API'
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
    this.setState({loginDisabled: true, errMessage: undefined})
    e.preventDefault()

    this.api.login({
      username: this.state.username,
      password: this.state.password
    })
    .then((token) => {
      this.api.setToken(token)
      return this.api.fetchUserInfo()
    })
    .then((info) => {
      localStorage.setItem('user_info', JSON.stringify(info))
      this.props.history.push('/')
    })
    .catch(() => this.setState({loginDisabled: false, errMessage: 'Please check your username and password and try again'}))
  }

  render() {
    return (
      <form onSubmit={(e) => this.loginClicked(e)}>
        <h2>Already have an account</h2>
        <div className="form-group">
          <label htmlFor="loginUsername">User Name</label>
          <input className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})} id="loginUsername" pattern="^[a-z0-9_]{3,25}$" placeholder="Enter your desired username" required/>
          <small id="usernameHelp" className="form-text text-muted">Your Username can only contain letters and numbers.</small>
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} className="form-control" id="loginPassword" placeholder="Password" pattern="^.{8,400}$" required/>
          <small id="loginPassword" className="form-text text-muted">Your password must be more that 8 letter long.</small>
        </div>
        {this.state.errMessage &&
          <div>
            <small id="loginPassword" className="form-text text-muted" style={{color: 'red'}}> {this.state.errMessage} </small>
          </div>
        }
        <button type="submit" value="submit" disabled={this.state.loginDisabled} className="btn btn-default">Login</button>
      </form>
    )
  }
}

LoginComponent.propTypes = {
  isLogedIn: PropTypes.bool,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(LoginComponent)
