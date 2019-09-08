import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Media}  from 'react-bootstrap'
import '../css/user.css'
import { setAuthedUser } from '../actions/authedUser'

class User extends Component {
  state = {
    redirectToReferrer: false
  }

  handleLogin = id => {
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
    this.setState({ redirectToReferrer: true })
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    }
    const { redirectToReferrer } = this.state
    const { user, users } = this.props

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Media onClick={() => this.handleLogin(user.id)}>
        <img
          className="avatar align-self-center mr-3"
          src={users[user.id].avatarURL}
          alt={`Avatar of ${users[user.id].avatarURL}`} />
        <Media.Body className="align-self-center mr-3">
          <span>{`${users[user.id].name}`}</span>
        </Media.Body>
      </Media>
    )
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id]
  return {
    user,
    users
  }
}

export default connect(mapStateToProps)(User)
