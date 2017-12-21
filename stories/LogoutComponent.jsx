import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

class LoginComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    localStorage.removeItem('user_token')
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        loging out
      </div>
    )
  }
}

LoginComponent.propTypes = {
  history: React.PropTypes.shape({push: React.PropTypes.func.isRequired}).isRequired
}

export default withRouter(LoginComponent)
