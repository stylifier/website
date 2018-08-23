import React, {Component, PropTypes} from 'react'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Followers from './pages/Followers.jsx'
import Search from './pages/Search.jsx'
import InstagramCallback from './pages/InstagramCallback.jsx'
import PinterestCallback from './pages/PinterestCallback.jsx'
import Messages from './pages/Messages.jsx'
import LogoutComponent from './components/Logout.jsx'
import Sponsorship from './pages/Sponsorship.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Products from './pages/Products.jsx'
import Policy from './pages/Policy.jsx'
import Orders from './pages/Orders.jsx'
import Basket from './pages/Basket.jsx'
import Colors from './pages/Colors.jsx'
import ColorCodeManager from './pages/ColorCodeManager.jsx'
import ProductManeger from './pages/ProductManeger.jsx'
import ApproveUser from './pages/ApproveUser.jsx'
import { Switch, Route } from 'react-router-dom'

require('./styles/application.scss')

let userToken

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.setURLElements(location)
  }


  setURLElements(location) {
    const args = {}
    location.search
    .substring(1)
    .split('&')
    .forEach(i => args[i.split('=')[0]] = i.split('=')[1] || '')

    if(!args.invite_code || args.invite_code.length <= 0)
      return

    localStorage.setItem('invite_code',
      args.invite_code ?
        decodeURIComponent(args.invite_code) :
        '')
  }

  render() {
    userToken = localStorage.getItem('user_token')

    return(
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={login}/>
        <Route exact path='/logout' component={LogoutComponent}/>
        <Route exact path='/profile/*' component={profile}/>
        <Route exact path='/followers' component={followers}/>
        <Route exact path='/search*' component={search}/>
        <Route exact path='/messages*' component={messages}/>
        <Route exact path='/instagram_callback*' component={InstagramCallback}/>
        <Route exact path='/pinterest_callback*' component={PinterestCallback}/>
        <Route exact path='/sponsorship' component={sponsorship}/>
        <Route exact path='/campaigns' component={campaigns}/>
        <Route exact path='/products' component={products}/>
        <Route exact path='/product/*' component={productManeger}/>
        <Route exact path='/policy' component={policy}/>
        <Route exact path='/orders' component={orders}/>
        <Route exact path='/basket' component={basket}/>
        <Route exact path='/colors' component={colors}/>
        <Route exact path='/approve_user' component={approveUser}/>
        <Route exact path='/color_code' component={colorCodeManager}/>
      </Switch>
    )
  }
}

function productManeger() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <ProductManeger/>
    </div>
  )
}

function colorCodeManager() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <ColorCodeManager/>
    </div>
  )
}

function approveUser() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <ApproveUser/>
    </div>
  )
}

function colors() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Colors/>
    </div>
  )
}

function basket() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Basket/>
    </div>
  )
}

function orders() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Orders/>
    </div>
  )
}

function campaigns() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Campaigns/>
    </div>
  )
}

function products() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Products/>
    </div>
  )
}

function policy() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Policy/>
    </div>
  )
}

function sponsorship() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Sponsorship/>
    </div>
  )
}

function messages() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Messages/>
    </div>
  )
}

function search() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Search/>
    </div>
  )
}

function followers() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Followers/>
    </div>
  )
}

function profile() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      <Profile/>
    </div>
  )
}

function login() {
  return (
    <div>
      <Navbar emptyRender={true}/>
      <Login/>
    </div>
  )
}

function Home() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      {userToken ? (<Dashboard/>) : (<Landing/>)}
    </div>
  )
}

App.propTypes = {
  location: PropTypes.object
}

export default App;
