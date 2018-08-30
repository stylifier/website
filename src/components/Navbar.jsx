import React, {Component, PropTypes} from 'react';
import API from '../API'
import { withRouter } from 'react-router-dom'
import ImageUploaderModal from './ImageUploaderModal.jsx'
import ImageDetailsModal from './ImageDetailsModal.jsx'
import ComposeThreadModal from './ComposeThreadModal.jsx'
import {connect} from 'react-redux'
import actions from '../actions'
require('../styles/Navbar.scss')


const mapStateToProps = (state) => {
    return {
        basket : state.basket,
        imageUploader : state.imageUploader,
        imageDetails : state.imageDetails,
        threadCreator : state.threadCreator
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initBasket: () =>
          dispatch((actions.initBasket())),
        openImageUploader: () =>
          dispatch((actions.openImageUploader())),
        closeImageUploader: () =>
          dispatch((actions.closeImageUploader()))
    }
};

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.emptyRender = this.props.emptyRender || false
    this.state = {
      searchPhrase: '',
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {},
      openOrders: [],
      orders: []
    }

    if(!this.api.token)
      return

    var OneSignal = window.OneSignal || [];
    OneSignal.push(['init', {
      appId: '32e810a8-17ec-46ce-92c8-852abd3df96f'
    }])

    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        OneSignal.getUserId().then(id => isSubscribed ?
          this.api.addSubsctiption(id) :
          this.api.removeSubsctiption(id)
        )
      });
    });

    OneSignal.push(() => OneSignal.getUserId().then(id => this.api.addSubsctiption(id)))

    this.api.fetchUserInfo()
    .then((info) => {
      localStorage.setItem('user_info', JSON.stringify(info))
      this.setState({userInfo: Object.assign({}, info)})
      this.fetchThreads()
      this.fetchOrders()
      props.initBasket()
    })
  }

  fetchThreads() {
    if(!this.state.userInfo || !this.state.userInfo.username)
      return

    this.api.fetchThreads()
    .then((threads) => {
      const unreadThreads = threads.data.filter(t =>
        t.status === 'REQUESTED' && t.from.username !== this.state.userInfo.username)

      this.setState({unreadMessagesCount: unreadThreads.length})
    })
  }

  fetchOrders() {
    if(!this.state.userInfo || !this.state.userInfo.username)
      return

    this.api.fetchOrders()
    .then(orders =>
      this.setState({
      openOrders: orders.filter(o => o.status === 'OPEN' && o.user.username === this.state.userInfo.username),
      orders: orders
    }))
  }

  componentDidMount() {
    this.pullingInterval = setInterval(() => {
      this.fetchThreads.call(this)
      this.fetchOrders.call(this)
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.pullingInterval)
  }


  refreshStats() {
  }

  searchClicked(e){
    e.preventDefault()
    this.props.history.push(`/search?username=${encodeURIComponent(this.state.searchPhrase)}&brand=${encodeURIComponent(this.state.searchPhrase)}&style=${encodeURIComponent(this.state.searchPhrase)}`)
    window.location.reload()
  }

  renderLoggedIn() {
    const profileLink = '/profile/' + this.state.userInfo.username
    const incomingOrderHangingCount = this.state.orders.filter(o => o.status === 'ORDERED' && o.user.username !== this.state.userInfo.username).length
    return (
      <div className="navbar-collapse collapse move-me">
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <form className="form-inline" style={{margin: 9}} onSubmit={(e) => this.searchClicked(e)}>
                <input type="text" value={this.state.searchPhrase} style={{minWidth: '16em'}} onChange={e => this.setState({searchPhrase: e.target.value})} className="form-control" placeholder="Search for Style, Brand or People" aria-label="Username" aria-describedby="basic-addon1"/>
              </form>
            </li>
            <li className="nav-item">
              <a className="nav-link dropdown-toggle" href={profileLink} style={{padding: 6}}>
                <img src={this.state.userInfo.profile_picture} className="img-circle" style={{width: 40, objectFit: 'cover', height: 40}}/>
              </a>
            </li>
            {this.state.userInfo.is_brand &&
              (<li className="nav-item">
              <a className="nav-link" href="/sponsorship">Sponsorship</a>
              </li>)
            }
            {this.state.userInfo.is_brand &&
              (<li className="nav-item">
              <a className="nav-link" href="/products">Products</a>
              </li>)
            }
            {this.state.userInfo.is_brand &&
              (<li className="nav-item">
              <a className="nav-link" href="/campaigns">Campaigns</a>
              </li>)
            }
            <li className="nav-item">
               <a className="nav-link" href="/messages">Messages</a>
               {this.state.unreadMessagesCount > 0 && <span className="badge" style={{
                    background: 'rgba(0,255,0,0.5)',
                    width: 'auto',
                    height: 'auto',
                    margin: 0,
                    borderRadius: '20%',
                    position:'absolute',
                    top:3,
                    right:0,
                    padding: '3 3 1 3'
                }}>{this.state.unreadMessagesCount}</span>}
            </li>
            <li className="nav-item">
              <a className="dropdown-item" href="/followers">Following</a>
            </li>
            <li className="nav-item">
              <a className="dropdown-item" href="/orders">Orders</a>
              {incomingOrderHangingCount > 0 && <span className="badge" style={{
                   background: 'rgba(0,255,0,0.5)',
                   width: 'auto',
                   height: 'auto',
                   margin: 0,
                   borderRadius: '20%',
                   position:'absolute',
                   top:3,
                   right:0,
                   padding: '3 3 1 3'
               }}>{incomingOrderHangingCount}</span>}
            </li>
            {this.props.basket.length > 0 && <li className="nav-item">
               <a href="/basket" className="fa fa-shopping-cart fa-lg"></a>
               <span className="badge" style={{
                    background: 'rgba(0,255,0,0.5)',
                    width: 'auto',
                    height: 'auto',
                    margin: 0,
                    borderRadius: '20%',
                    position:'absolute',
                    top:3,
                    right:0,
                    padding: '3 3 1 3'
                }}>{this.props.basket.length}</span>
            </li>}
            <li className="nav-item">
                <a href="javascript:void(0)" onClick={(e) => {
                  e.preventDefault()
                  this.props.openImageUploader()
                }} className="fa fa-plus fa-lg" style={{marginTop: 2,marginRight: 10, color: 'white'}}></a>
            </li>
        </ul>
      </div>
    )
  }

  renderLanding() {
    return (
      <div className="navbar-collapse collapse move-me" style={{backgroundColor: '#f6f6f6'}}>
        <ul className="nav navbar-nav navbar-right">
            <li><a style={{color: '#3b4e68'}} href="/login">Register / Login</a></li>
        </ul>
      </div>
    )
  }

  getNavElements( ) {
    if(this.props.isLogedIn)
      return this.renderLoggedIn()

    return this.renderLanding()
  }

  render() {
    const navElements = this.getNavElements()
    const {isLogedIn} = this.props
    return (
      <div>
      {this.props.imageUploader.isOpen &&
        (<ImageUploaderModal
          defaultValue={this.state.username}
          currentUser={this.state.currentUser}
          onClose={() => this.props.closeImageUploader()}/>)}

      {this.props.imageDetails.isOpen &&
        (<ImageDetailsModal/>)}

      {this.props.threadCreator.isOpen &&
        <ComposeThreadModal/>}

      <div className="navbar navbar-inverse navbar-fixed-top" style={{width: '100%'}}>
        <div className="container" style={{width: '100%' , backgroundColor: isLogedIn ? '#3b4e68' : '#f6f6f6'}}>
            <div className="navbar-header" >
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a
                  className="navbar-brand"
                  style={{
                    marginTop: 4,
                    fontFamily: '\'Julius Sans One\', sans-serif',
                    color: isLogedIn ? '#f6f6f6' : '#3b4e68',
                    fontSize: isLogedIn ? '': 24
                  }}
                  href="/"
                >
                  <img style={{
                      width: 30,
                      height: 30,
                      objectFit: 'cover',
                      float: 'left',
                      marginTop: -5,
                      marginRight: 5,
                      borderRadius: 7,
                      marginBottom: 0}}
                      src="/assets/img/favicon.png"/>
                  Stylifier
                </a>
            </div>
            {!this.emptyRender && navElements}
        </div>
      </div>
      <div style={{display: 'block', margin: '50px 0'}}/>
      </div>
    )
  }
}

Navbar.propTypes = {
  isLogedIn: PropTypes.bool,
  emptyRender: PropTypes.bool,
  initBasket: PropTypes.func,
  closeImageUploader: PropTypes.func,
  openImageUploader: PropTypes.func,
  basket: PropTypes.array,
  imageUploader: PropTypes.object,
  imageDetails: PropTypes.object,
  threadCreator: PropTypes.object,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
