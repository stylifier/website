import React, {Component} from 'react'
import Navbar from '../stories/Navbar.jsx'
import Dashboard from '../stories/Dashboard.jsx'
import Landing from '../stories/Landing.jsx'
import Login from '../stories/Login.jsx'
import LogoutComponent from '../stories/LogoutComponent.jsx'
import { Switch, Route } from 'react-router-dom'

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
      </Switch>
    )
  }
}

function footer(backgroundColor) {
  backgroundColor = backgroundColor || 'black'
  let color = backgroundColor === 'black' ? 'white' : 'black'
  return (
    <div id="footer" style={{borderTop: '1px solid black', fontSize: '16px', color: color, backgroundColor: backgroundColor}}>
      &copy 2017 <a href="http://stylifier.com" target="_blank">stylifier.com</a> | All Rights Reserved
    </div>
  )
}

function login() {
  return (
    <div>
      <Navbar emptyRender={true}/>
      <Login/>
      {footer('white')}
    </div>
  )
}

function Home() {
  return (
    <div>
      <Navbar isLogedIn={userToken ? true : false}/>
      {userToken ? (<Dashboard/>) : (<Landing/>)}
      {footer()}
    </div>
  )
}
export default App;
