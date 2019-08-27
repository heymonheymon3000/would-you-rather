import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import { withRouter } from 'react-router-dom'

import { setLoggedInUser } from '../actions/loggedInUser'

class Login extends Component {

  onSelected = (e) => {
    e.preventDefault()

    const { dispatch } = this.props
    const loggedInUser = e.target.innerText

    dispatch(setLoggedInUser(loggedInUser))

    this.props.history.push(`/`)
  }

  render () {
    const userIds = this.props.userIds.map((id) => <Dropdown.Item key={id} onClick={this.onSelected}>{id}</Dropdown.Item>)

    return (
      <Card className="text-center" border="primary">
        <Card.Header style={{ fontWeight: 'bold' }}>Welcome to the would you rather App!<br/>
          <span style={{ fontWeight: 'normal' }}>
            Please sign in to continue.</span>
        </Card.Header>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Dropdown as={ButtonGroup}>
            <Button variant="success" size="lg">Select User</Button>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>
            <Dropdown.Menu>
              { userIds }
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users)
  }
}

export default withRouter(connect(mapStateToProps)(Login))
