import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render () {
    return (
      <Router>
        <div className='container'>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
        </div>
      </Router>
    )

  }
}

export default connect()(App)
