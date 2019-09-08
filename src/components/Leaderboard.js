import React, { Component, Fragment } from 'react'
import '../css/leaderboard.css'
import { connect } from 'react-redux'
import { Card, Container, Row, Col, Media }  from 'react-bootstrap'

class Leaderboard extends Component {
  render() {
    const { users, leaderboardPlacements } = this.props

    return (
      <Container style={{ marginTop: '20px', width: '60rem'}} className="justify-content-md-center" >
        {leaderboardPlacements.sort((a, b) => b.points - a.points).map(user => (
          <Fragment key={user.id}>
            <Row className="justify-content-md-center">
              <Card  style={{ width: '48rem' }}>
                <Media>
                  <img
                      className="avatar-takevote align-self-center mr-5 ml-5"
                      src={users[user.id].avatarURL}
                      alt={`Avatar of ${users[user.id].avatarURL}`}/>
                    <Media.Body className='media-body-takevote'>
                      <Container>
                        <Row>
                          <Col md={{ span: 8}}>
                            <Row>
                              <Col md={{ span: 8, offset: 1}} style={{ marginBottom: '8px', marginTop: '8px', fontWeight: 'bold'}} >
                                <h3>{`${users[user.id].name}`}</h3>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={{ span: 7, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                                <h6>Answered questions </h6>
                              </Col>
                              <Col md={{ span: 3, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                                <h6>{Object.keys(users[user.id].answers).length}</h6>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={{ span: 7, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                                <h6>Created questions </h6>
                              </Col>
                              <Col md={{ span: 3, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                                <h6>{users[user.id].questions.length}</h6>
                              </Col>
                            </Row>
                          </Col>
                          <Col style={{ fontWeight: 'bold'}} >
                             <Card style={{ width: '10rem', marginTop: '10px'}}>
                              <Card.Header className='text-center'>Score</Card.Header>
                              <p style={{marginTop: '18px'  }} className='text-center'>{user.points}</p>
                             </Card>
                          </Col>
                        </Row>
                      </Container>
                    </Media.Body>
                </Media>
              </Card>
            </Row>
            <br/>
          </Fragment>
        ))}
      </Container>
    )
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboardPlacements = userIds.map(id => ({
    id: id,
    points:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length
  }))

  return {
    leaderboardPlacements,
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
