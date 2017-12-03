import React, {Component} from 'react';
import Timer from '../stories/timer.js'
import Weather from '../stories/weather.jsx'

class App extends Component {
  constructor() {
    super()

  }

  render() {
    return(
      <div>
        <Timer/>
        <Weather/>
      </div>
    )
  }
}
export default App;
