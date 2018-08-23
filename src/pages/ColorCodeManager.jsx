import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router-dom'
import API from '../API'

class ColorCodeManager extends Component {
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
      name: args.name ? decodeURIComponent(args.name) : null,
      message: 'Please wait...'
    }
  }

  componentDidMount() {
    const {code, name} = this.state
    this.api.addColorCode(code, name)
    .then(() => {
      this.setState({message: 'done!'})
      window.close()
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

ColorCodeManager.propTypes = {
  location: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
    listen: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ColorCodeManager)
