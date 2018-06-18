import React, {Component, PropTypes} from 'react';
import FeedViewer from '../components/FeedViewer.jsx'
import Footer from '../components/Footer.jsx'
import CampaignsViewer from '../components/CampaignsViewer.jsx'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  renderSuggestions() {
    return (
      <div className="container" style={{maxWidth: 1700}}>
        <div className="row clr-white" >
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12"/>
          <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <CampaignsViewer/>
            <hr/>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12"/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderSuggestions()}
        <div id="home-sec" className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <FeedViewer/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  isLogedIn: PropTypes.bool
}

export default Dashboard
