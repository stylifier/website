import React, {Component, PropTypes} from 'react';
require('../styles/feed.scss')

class CampaignItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  refreshStats() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize(){
    this.render()
  }

  renderApproved() {
    const {base} = this.props
    const href = '/profile/' + base.user.username.toString()

    if(base.approved)
      return

    return (
      base.approved === false ?
      <h5> <a href={href} style={{textDecoration: 'none', color: 'black', float: 'right'}}> Not approved: {base['rejection_reason']} </a> </h5> :
      <h5> <a href={href} style={{textDecoration: 'none', color: 'black', float: 'right'}}> (Waiting for approval) </a> </h5>
    )
  }

  render() {
    const {base, showApproval} = this.props
    const href = '/profile/' + base.user.username.toString()
    const img = base.media.images.standard_resolution.url

    return (
      <div className="containerItem"
        style={{
          visibility: this.state.loaded ? 'visible' : 'hidden',
          margin: 20,
          WebkitFilter: base.expired ? 'grayscale(100%)': 'grayscale(0%)',
          filter: base.expired ? 'grayscale(100%)': 'grayscale(0%)'
        }}>
        <div className='campaign' style={{height: 'auto'}}>
          <a href={href}>
            <img
              src={img}
              style={{
                objectFit: 'scale-down',
                boxShadow: '0px 1px 5px 1px gray',
                borderRadius: 4,
                width: '100%',
                height: 'auto'
              }}
              className="overlay"
              onClick={() => this.likeClicked()}
              onLoad={() => {
                this.setState({loaded: true})
                this.props.onLoaded()
              }}
            />
          </a>
        </div>
        <h4 style={{marginTop: 20}}> <a href={href} style={{textDecoration: 'none', color: 'black'}}> {base.description} </a> </h4>
        {(showApproval) && this.renderApproved()}
        <h5> <a href={href} style={{textDecoration: 'none', color: '#595959'}}> {base.user.username} </a> </h5>
      </div>
    )
  }
}

CampaignItem.propTypes = {
  base: PropTypes.object,
  showApproval: PropTypes.bool,
  onLoaded: PropTypes.func
}

export default CampaignItem
