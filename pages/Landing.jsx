import React, {Component} from 'react'
import Footer from '../components/Footer.jsx'
import LandingTopSection from '../components/LandingTopSection.jsx'
import {isMobile} from 'react-device-detect'

class Landing extends Component {
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
        <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{height: 'calc(100% - 100px)', maxHeight: '1342px'}}>
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="3"></li>
            <li data-target="#myCarousel" data-slide-to="4"></li>
          </ol>
          <div className="carousel-inner">
            <div className="item active" style={{height: '100%', maxHeight: '1342px'}}>
              <LandingTopSection message="FIND YOUR PERSONAL STYLIST" image="assets/img/landing-1-1.jpeg"/>
            </div>
            <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
              <LandingTopSection message="BECOME A PROFESSIONAL STYLIST" image="assets/img/landing-1-2.jpeg"/>
            </div>
            <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
              <LandingTopSection message="ASK FASHION ADVICES FROM YOUR FAVORITE BRANDS" image="assets/img/landing-1-4.jpeg"/>
            </div>
            <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
              <LandingTopSection message="MAKE A DIFFERENCE FOR YOURSELLF AND OTHERS" image="assets/img/landing-1-3.jpeg"/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={false}/>
      </div>
    )
  }
}

Landing.propTypes = {
}

export default Landing
