import React, { Component, Fragment } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

class NavBar extends Component {
  render () {
    const { users, authedUser } = this.props

    return (
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>Would You Rather!</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            { authedUser &&
                <Fragment>
                  <Nav>
                    <LinkContainer className="nav-link" to="/home">
                      <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer className="nav-link" to="/add">
                        <NavItem>New Question</NavItem>
                    </LinkContainer>
                    <LinkContainer className="nav-link" to="/leaderboard">
                      <NavItem>Leader Board</NavItem>
                    </LinkContainer>
                  </Nav>
                  <Navbar.Collapse className="justify-content-end">
                    <NavItem className="px-md-1">
                      Hello, { users[authedUser].name }
                    </NavItem>
                    <NavItem className="px-md-1">
                      <img
                        src={ users[authedUser].avatarURL }
                        alt={`Avatar of ${users[authedUser].name}`}
                        className="avatar" />
                    </NavItem>
                    <LinkContainer className="nav-link" to="/">
                      <NavItem>Logout</NavItem>
                    </LinkContainer>
                  </Navbar.Collapse>
                </Fragment>
          }
        </Navbar>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser,
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))
