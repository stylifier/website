import React, {Component} from 'react'
import {isMobile} from 'react-device-detect'

class LandingTopSection extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  // <a href={`https://api.instagram.com/oauth/authorize/?client_id=5818518da819445c85250c7637b7eb4c&redirect_uri=${document.location.origin}/instagram_callback&response_type=code&scope=basic`} className="btn btn-default btn-transparent btn-lg btn-social btn-instagram" style={{fontSize: '1.4em', textAlign: 'center'}}>
  //   <span className="fa fa-instagram"></span> Continue with instagram
  // </a>

  renderButtons() {
    return (
      <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <p style={{text: 'center', width: '100%', marginBottom: 70}}>
          <p className={window.innerWidth > 768 ? 'btn-group' : 'btn-group-vertical'} role="group">
            <a role="button" href="/login" style={{fontSize: '1.4em',textAlign: 'center'}} className="btn btn-default btn-transparent btn-lg">Join Stylifier Now!</a>
            <a href={'https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://www.stylifier.com/pinterest_callback&scope=read_public&client_id=4970207959045910011'} className="btn btn-default btn-transparent btn-lg btn-social btn-pinterest" style={{fontSize: '1.4em', textAlign: 'center'}}>
              <i className="fa fa-pinterest" style={{color: '#BD081C'}}></i> Continue with Pinterest
            </a>
          </p>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div id="home-sec" style={{width: '100%', height: '100%', maxHeight: '1342px', padding: 0, backgroundColor: 'black',color:'white',position: 'relative', overflow: 'hidden'}}>
        <div style={{
          background: 'url(' + this.props.image + ') center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100%',
          maxHeight: '1342px',
          overflow: 'hidden'
        }}>

        <div className="row">
          <div className="col-lg-6 col-md-10 col-sm-10 col-xs-12">
            <div style={{margin: 20, marginTop: '10%'}}>
              {this.props.message.split(' ').map((i, t) => <p key={t} style={{ color: 'black', background: 'white', float: 'left', margin: '10 10 0 0', padding: '0 5 0 5', fillOpacity:"0.1", fontSize: window.innerWidth > 768 ? '4em' : '3em', lineHeight: '1em', height: '1em'}}>{i}</p>)}
            </div>
          </div>
        </div>

        {this.renderButtons()}
        </div>
      </div>
    )
  }
}

LandingTopSection.propTypes = {
  image: React.PropTypes.string,
  message: React.PropTypes.string
}

export default LandingTopSection
