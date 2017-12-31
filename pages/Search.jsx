import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import UsersViewer from '../components/UsersViewer.jsx'
import BrandsViewer from '../components/BrandsViewer.jsx'

class Search extends Component {
  constructor(props) {
    super(props)
    const args = {}

    this.props.location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1])

    this.state = {
      usernamePhrase: args.username ? decodeURIComponent(args.username) : null,
      brandPhrase: args.brand ? decodeURIComponent(args.brand) : null
    }


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
            </div>
          </div>
        </div>
        {this.state.brandPhrase && (<BrandsViewer phrase={this.state.brandPhrase} scrollToUpdate={!this.state.usernamePhrase}/>)}
        {this.state.usernamePhrase && (<UsersViewer phrase={this.state.usernamePhrase} scrollToUpdate={!this.state.brandPhrase}/>)}
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

Search.propTypes = {
  location: PropTypes.object
}

export default withRouter(Search)
