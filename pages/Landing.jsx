import React, {Component} from 'react'
import Footer from '../components/Footer.jsx'
import {isMobile} from 'react-device-detect'

class Landing extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  renderFirstSection() {
    return (
      <div id="home-sec" className="container" style={{width: '100%', height: '100%', padding: 0, backgroundColor: 'black',color:'white', overflow: 'hidden'}}>
        <div className="row clr-white" >
          <div className={isMobile ? 'col-lg-2 col-md-2 col-sm-2 col-xs-2' : 'col-lg-3 col-md-4 col-sm-4 col-xs-2'}>
            <div style={{
              background: 'url(assets/img/left-shade.png) right repeat-x, url(assets/img/left-1.jpeg) left',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 100%',
              height: '100%',
              overflow: 'hidden'
            }}>
              <img src="assets/img/left-1.jpeg" className="img-responsive main-img"  height="auto" style={{maxHeight:'600px', maxWidth:'400px', height:'100%', opacity: 0.0}}/>
            </div>
        </div>
        <div className={isMobile ? 'col-lg-8 col-md-8 col-sm-8 col-xs-8' : 'col-lg-6 col-md-4 col-sm-4 col-xs-8'} style={{color:'white', marginTop: '5%'}}>
          <div className="col-lg-3 col-md-0 col-sm-0 col-xs-0"/>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <p data-scroll-reveal="enter from the bottom after 0.7s" style={{fontSize: '1.4em', textAlign: 'center'}}>
                Always had the desire to have your personal styler?
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 1.3s" style={{fontSize: '1.4em', textAlign: 'center'}}>
                Ever struggled finding the right style for the right occasion?
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 0s" style={{text: 'center'}}>
                <a role="button" href="/login" style={{fontSize: '1.4em', textAlign: 'center'}} className="btn btn-default btn-transparent btn-lg">Join Sylifier Now!</a>
                <a href={`https://api.instagram.com/oauth/authorize/?client_id=5818518da819445c85250c7637b7eb4c&redirect_uri=${document.location.origin}/instagram_callback&response_type=code&scope=basic`} className="btn btn-default btn-transparent btn-lg btn-social btn-instagram" style={{fontSize: '1.4em', marginTop: 20, textAlign: 'center'}}>
                  <span className="fa fa-instagram"></span> Continue with instagram
                </a>
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 2s" style={{fontSize: '1.2em', textAlign: 'center'}}>
                Join as a styler if you believe other people appreciate your advises.
            </p>
          </div>
          <div className="col-lg-3 col-md-0 col-sm-0 col-xs-0"/>
        </div>
        <div className={isMobile ? 'col-lg-2 col-md-2 col-sm-2 col-xs-2' : 'col-lg-3 col-md-4 col-sm-4 col-xs-2'}>
          <div style={{
            background: 'url(assets/img/right-shade.png) left repeat-x, url(assets/img/right-1.jpeg) right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            <img src="assets/img/left-1.jpeg" className="img-responsive main-img"  height="auto" style={{overflow: 'hidden', maxHeight:'600px', maxWidth:'400px', height:'100%', opacity: 0.0}}/>
          </div>
        </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderFirstSection()}
        <Footer whiteBackground={false}/>
      </div>
    )
  }
}

Landing.propTypes = {
}

export default Landing
