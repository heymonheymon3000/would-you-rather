import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import User from './User'
import { Card, Dropdown, Container, Row }  from 'react-bootstrap'

class Login extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    const { userIds, location } = this.props

    const dropDownItems = userIds.map((id) =>
      <Dropdown.Item style={{ display:'inline-block'}}
        key={id}
        onClick={this.onSelected}>
        <div key={id}>
          <User id={id} location={location} />
        </div>
      </Dropdown.Item>)

    return (
      <Container style={{ paddingTop: '20px' }}>
        <Row className="justify-content-md-center">
          <Card className="text-center" style={{ width: '40rem' }}>
            <Card.Header style={{ fontWeight: 'bold' }}>
              Welcome to the would you rather App!<br/>
              <span style={{ fontWeight: 'normal' }}>
                Please sign in to continue.</span>
            </Card.Header>
            <Card.Body>
              <Card.Title>Sign in</Card.Title>
              <Dropdown>
                <Dropdown.Toggle block>
                  Select User
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  { dropDownItems }
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps({users}) {
  return {
    userIds: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(Login)
