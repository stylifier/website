import React, {Component, PropTypes} from 'react';
import FeedViewer from '../components/FeedViewer.jsx'
import Footer from '../components/Footer.jsx'

class Dashboard extends Component {
  constructor(props) {
    super(props)
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
