import React, {Component, PropTypes} from 'react'
import API from '../src/API'
import { withRouter } from 'react-router-dom'

class CreateUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      fullname: '',
      agreed: false,
      registerDisabled: false
    }
    this.api = new API()
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  registerClicked(e) {
    this.setState({registerDisabled: true})
    e.preventDefault()

    this.api.register({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      full_name: this.state.fullname
    })
    .then((token) => {
      this.api.setToken(token)
      return this.api.fetchUserInfo()
    })
    .then((info) => {
      localStorage.setItem('user_info', JSON.stringify(info))
      this.props.history.push('/')
    })
    .catch(() => {
      this.setState({registerDisabled: false})
    })
  }

  render() {
    return (
      <form onSubmit={(e) => this.registerClicked(e)}>
        <h2>Become a user</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className="form-control" pattern="^.{3,40}$" value={this.state.fullname} onChange={e => this.setState({fullname: e.target.value})} id="fullName" placeholder="Enter your full name" required/>
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input pattern="^[a-z0-9_]{3,25}$" className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})} id="username" placeholder="Enter your desired username" required/>
          <small id="usernameHelp" className="form-text text-muted">Your Username can only contain letters and numbers.</small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control" value={this.state.email} onChange={e => this.setState({email: e.target.value})} id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
          <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" pattern="^.{8,400}$" className="form-control" value={this.state.password} onChange={e => this.setState({password: e.target.value})} id="exampleInputPassword1" placeholder="Password" required/>
          <small id="passwordHelp" className="form-text text-muted">Your password must be more that 8 letter long.</small>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" value={this.state.agreed} onChange={e => this.setState({agreed: e.target.value})} className="form-check-input" required/>
            I agree to terms and conditions
          </label>
        </div>
        <button type="submit" disabled={this.state.registerDisabled} className="btn btn-default">Create User</button>
      </form>
    )
  }
}

CreateUserComponent.propTypes = {
  isLogedIn: PropTypes.bool,
  api: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(CreateUserComponent)
