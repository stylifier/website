import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router-dom'
import API from '../API'

class ApproveUser extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    const args = {}
    this.props.location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    this.state = {
      usernameToapprove: args.username ? decodeURIComponent(args.username) : null,
      message: 'Please wait...'
    }
  }

  componentDidMount() {
    this.api.approveUser(this.state.usernameToapprove)
    .then(() => {
      this.setState({message: 'done!'})
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
      <div style={{ marginTop: 100 }}>
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

ApproveUser.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ApproveUser)
