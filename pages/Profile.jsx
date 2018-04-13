import React, {Component, PropTypes} from 'react'
import Footer from '../components/Footer.jsx'
import SimpleImageViewer from '../components/SimpleImageViewer.jsx'
import { withRouter } from 'react-router-dom'
import API from '../src/API'
import Promise from 'bluebird'
import ComposeThreadModal from '../components/ComposeThreadModal.jsx'
import Rating from 'react-rating'
import Viewer from '../components/Viewer.jsx'
import BrandImage from '../components/BrandImage.jsx'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    const parts = this.props.location.pathname.split('/')
    this.state = {
      username:  parts[parts.length - 1],
      currentUser: {},
      styles: [],
      showComposeModal: false,
      followedByUser: false
    }

    this.getCurrentUser()
    .then((currentUser) => {
      this.setState(Object.assign({currentUser: currentUser}))
      return this.api.fetchUser(this.state.username)
    })
    .then(res => {
      this.api.getUserStyles(this.state.username)
      .then(s => this.setState({styles: [...s]}))
      this.setState(Object.assign({}, res))
      return this.api.fetchUserFollowers(this.state.currentUser.username, 0, this.state.username)
    })
    .then(res => {
      if(!this.state.is_brand)
        return res

      return this.api.fetchUserSponsors(this.state.currentUser.username, 0, this.state.username)
      .then(t => {
        this.setState({sponsorshipStatus: t.data[0] ? t.data[0].status : undefined})
        return res
      })
    })
    .then(res =>
      this.api.fetchUserSponsors(this.state.username)
      .then(t => {
        this.setState({sponsors: [...t.data.filter(t => t.status === 'ACCEPTED')]})
        return res
      })
    )
    .then(res => {
      this.setState(Object.assign({followedByUser: res.data.length > 0}))
    })
  }

  getCurrentUser() {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem('user_info')))
    } catch (e) {
      return this.api.fetchUserInfo()
    }
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  followClicked(e) {
    e.preventDefault()

    this.api.followUser(this.state.username)
    .then(() =>
      this.api.fetchUserFollowers(this.state.currentUser.username, 0, this.state.username))
    .then(res =>
      this.setState(Object.assign({followedByUser: res.data.length > 0})))
  }

  rendersponsorshipBtn() {
    const {currentUser, username, is_brand, sponsorshipStatus} = this.state

    if(!currentUser)
      return

    if(username === currentUser.username
      || !is_brand) {
      return
    }

    if(sponsorshipStatus === 'REQUESTED')
      return (<a className='btn btn-info' disabled style={{color: 'white', width: '30%', minWidth: '150px',  float: 'right'}} >
        Sponsorship requested
      </a>)
    else if(sponsorshipStatus === 'ACCEPTED')
      return (<a className='btn btn-success' disabled style={{color: 'white', width: '30%', minWidth: '150px',  float: 'right'}} >
        Sponsorship accepted
      </a>)
    else
      return (<a className='btn btn-primary' onClick={(e) => {
        e.preventDefault()
        this.setState({sponsorshipStatus: 'REQUESTED'})
        this.api.sponsorUser(username)
      }} style={{color: 'white', width: '30%', minWidth: '150px',  float: 'right'}} >
        Ask for sponsorship
      </a>)
  }

  renderFollowMessageBtn() {
    if(!this.state.currentUser)
      return

    if(this.state.username === this.state.currentUser.username) {
      return
      // return (<a className='btn btn-primary' style={{color: 'white', width: '100%'}} >
      //   edit profile
      // </a>)
    }
    else if(this.state.followedByUser) {
      return (<a className='btn btn-primary' onClick={(e) => {
        e.preventDefault()
        this.setState({showComposeModal: true})
      }} style={{color: 'white', width: '100%'}} >
        ask for advice
      </a>)
    }
    else {
      return (<a className='btn btn-primary' onClick={(e) => this.followClicked(e)} style={{color: 'white', width: '100%'}} >
        follow
      </a>)
    }

  }

  render() {
    const isCurrentUser = this.state.username === this.state.currentUser.username
    return (
      <div>
        {this.state.showComposeModal &&
          (<ComposeThreadModal
            defaultValue={this.state.username}
            currentUser={this.state.currentUser}
            onClose={() => this.setState({showComposeModal: false})}/>)}
        <div id="home-sec" className="container" style={{padding: 50}}>
          <div className="row clr-white" style={{textAlign: 'center'}}>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
              <img src={this.state.profile_picture} className="img-circle" style={{height: 300, objectFit: 'cover',width: 300}}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{textAlign: 'left'}}>
              {this.renderFollowMessageBtn()}
              <div>
              {this.state.full_name} <a href={'/profile/'+this.state.username}>@{this.state.username}</a>
              </div>
              <div style={{clear: 'left'}}>
                {this.state.rating > 0 ?
                  <Rating
                    initialRating={this.state.rating}
                    readonly
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x fullstar"
                  /> :
                  <p> {this.state.full_name} does not have a rating yet. </p>}
              </div>
              <div style={{textAlign: 'left', float: 'none'}}>
                {this.state.bio && this.state.bio.split(/(?:\r\n|\r|\n)/g).map((t, i) => (<p key={i} style={{textAlign: 'left'}}> {t} </p>))}
              </div>
              <br/>
              {this.rendersponsorshipBtn()}
            </div>
          </div>
        </div>

        {this.state.sponsors && this.state.sponsors.length > 0 && (
          <div  style={{float: 'none',paddingLeft: 100, paddingRight: 100, paddingTop: 20, paddingBottom: 20}}>
            <hr/>
            <h4> User's Sponsors: </h4>
            <Viewer
              largeRowCount={6}
              mediomRowCount={4}
              smallRowCount={2}
              dommy={true}
              styleOverwrite={{margin: 0, width: '100%'}}
              baseItems={[...this.state.sponsors.map(t => t.sponsor)]}
            ItemView={BrandImage}/>
          </div>)}

        {this.state.styles.length > 0 && (
          <div style={{float: 'none',paddingLeft: 100, paddingRight: 100, paddingTop: 20, paddingBottom: 20}}>
          <hr/>
          <h4> User's Styles: </h4>
            {this.state.styles.map((s,i) => (
              <a className="btn shadowed" key={i} href={`/search?style=${s}`} style={{color: 'white', backgroundColor: 'blue', borderRadius: 20, float: 'left', margin: 10}}>
                {s}
              </a>)
            )}
            <br/>
          </div>
        )}

        <div>
          <SimpleImageViewer username={this.state.username} ItemViewProps={{showMakeProfilePicture: true, showUser: false, showLike: !isCurrentUser, showTag: true}}/>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

Profile.propTypes = {
  location: PropTypes.object
}

export default withRouter(Profile)
