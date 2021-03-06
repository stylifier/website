import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router-dom'
import API from '../API'

class InstagramCallback extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    const args = {}
    this.props.location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    this.state = {
      code: args.code ? decodeURIComponent(args.code) : null,
      message: 'Please wait...'
    }
  }

  componentDidMount() {
    this.api.register({
      instagram_code: this.state.code,
      invite_code: localStorage.getItem('invite_code')
    })
    .then((token) => {
      this.api.setToken(token)
      this.props.history.push('/')
    })
    .catch((e) => {
      this.setState({message: 'failed, ' + e.message})
    })
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div id="home-sec" className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.state.message}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

InstagramCallback.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(InstagramCallback)
