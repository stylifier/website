// Application entrypoint.

// Load up the application styles
// require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import api from './middleware/api'

const store = createStore(reducer, {}, applyMiddleware(api))

ReactDOM.render((
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
), document.getElementById('react-root'));
