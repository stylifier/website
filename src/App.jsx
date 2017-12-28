import React, {Component} from 'react'
import Navbar from '../components/Navbar.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Landing from '../pages/Landing.jsx'
import Login from '../pages/Login.jsx'
import Profile from '../pages/Profile.jsx'
import Followers from '../pages/Followers.jsx'
import LogoutComponent from '../components/Logout.jsx'
import { Switch, Route } from 'react-router-dom'

require('../styles/application.scss')

let userToken

class App extends Component {
  constructor() {
    super()
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

      </Switch>
    )
  }
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
export default App;
