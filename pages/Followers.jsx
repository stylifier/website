import React, {Component} from 'react';
import FollowersViewer from '../components/FollowersViewer.jsx'
import Footer from '../components/Footer.jsx'

class Followers extends Component {
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
            <FollowersViewer/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Followers
