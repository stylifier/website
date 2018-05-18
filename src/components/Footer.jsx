import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

class Footer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const backgroundColor = this.props.whiteBackground ? 'white' : 'black'
    const color = backgroundColor === 'black' ? 'white' : 'black'
    return (
      <div id="footer" style={{
          borderTop: '1px solid black',
          fontSize: '.8em',
          color: color,
          backgroundColor: backgroundColor
        }}>
        &copy; 2017 <a href="http://stylifier.com" target="_blank">stylifier.com</a> | All Rights Reserved
      </div>
    )
  }
}

Footer.propTypes = {
  whiteBackground: React.PropTypes.bool
}

export default withRouter(Footer)
