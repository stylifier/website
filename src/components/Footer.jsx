import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const {whiteBackground} = this.props
    const backgroundColor = whiteBackground ? '#f6f6f6' : '#3b4e68'
    const color = whiteBackground ? '#3b4e68': '#f6f6f6'
    const linkStyle = {
      color: whiteBackground ? '': '#71d5de',
      fontSize: '1.2em',
      marginRight: 30,
      marginLeft: 30
    }
    return (
      <div
        id="footer"
        style={{
          borderTop: whiteBackground ? '1px solid black': '',
          fontSize: '.8em',
          color: color,
          backgroundColor: backgroundColor,
          textAlign: 'center'
        }}>
        <a href="/" target="_blank" style={linkStyle}>Home</a>
        |
        <a href="/policy" target="_blank" style={linkStyle}>Legal / Policy</a>
        |
        <a href="/policy" target="_blank" style={linkStyle}>Impressum</a>
        <br/>
        <p style={{marginTop: 10, marginBottom: -10}}>
          &copy; 2018 <a href="http://stylifier.com" target="_blank" style={{color: whiteBackground ? '': '#71d5de'}}>stylifier.com</a> | All Rights Reserved
        </p>
      </div>
    )
  }
}

Footer.propTypes = {
  whiteBackground: React.PropTypes.bool
}

export default withRouter(Footer)
