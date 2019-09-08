import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Media, Container, Col, Button }  from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../css/question.css'

class Question extends Component {
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  textTruncate = (str, length, ending) => {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }

  render() {
    const { question, user, question_id } = this.props
    return (
      <Row className="justify-content-md-center">
        <Card  style={{ width: '36rem' }}>
        <Card.Header style={{ fontWeight: 'bold' }}>{user.name} asks:</Card.Header>
          <Card.Body>
            <Media>
              <img
                className="avatar-question align-self-center mr-5 ml-3"
                src={user.avatarURL}
                alt={`Avatar of ${user.avatarURL}`} />
              <Media.Body className='media-body-question'>
                <Container>
                  <Row >
                    <Col md={{ span: 10, offset: 2 }} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                      <span>Would you rather</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ span: 10, offset: 2 }}>
                      <span>...{this.textTruncate(question.optionOne.text, this.getRandomInt(2,14))}</span>
                    </Col>
                  </Row>
                  <Row >
                    <Col style={{ fontWeight: 'bold' }} md={{ span: 10, offset: 2 }}>
                      <LinkContainer className="nav-link" to={`/question/${question_id}`}>
                        <Button block variant="primary">View Poll</Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                </Container>
              </Media.Body>
            </Media>
          </Card.Body>
        </Card>
      </Row>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id]
  const question_id = question.id
  const user = users[question.author]

  return {
    question,
    question_id,
    user
  }
}

export default connect(mapStateToProps)(Question)
