import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import PrivateRoute from './PrivateRoute'
import Leaderboard from '../components/Leaderboard'
import AddQuestion from '../components/AddQuestion'
import Vote from '../components/Vote'
import Navbar from './Navbar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Navbar />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/home" component={Dashboard} />
                <PrivateRoute path="/add" component={AddQuestion} />
                <PrivateRoute path="/question/:question_id" component={Vote} />
                <PrivateRoute path="/leaderboard" component={Leaderboard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App)
