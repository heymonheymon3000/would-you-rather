import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
  render () {
    const { loggedInUser, questions, users } = this.props

    console.log('loggedInUser => ', loggedInUser)
    console.log('questions => ', questions);
    console.log('users => ', users);


    if (loggedInUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        Home Page - {loggedInUser}
      </div>
    )
  }
}

function mapStateToProps ({ loggedInUser, questions, users}) {
  return {
    loggedInUser,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(Home)
