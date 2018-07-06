import React, {Component} from 'react';
import ColorPalletSuggestion from '../components/ColorPalletSuggestion.jsx'
import Footer from '../components/Footer.jsx'

class Colors extends Component {
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
        <div id="home-sec" className="container" style={{marginTop: 70, marginBottom: 50, maxWidth: 1000}}>
          <div className="row clr-white">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ColorPalletSuggestion/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Colors
