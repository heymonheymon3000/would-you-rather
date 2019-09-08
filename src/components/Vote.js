import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Row, Media, Container, Col, Button, ProgressBar }  from 'react-bootstrap'
import {RadioGroup, Radio} from 'react-radio-group'
import '../css/question.css'
import '../css/vote.css'
import { handleSaveQuestionAnswer } from '../actions/questions'

class Vote extends Component {
  state = {
      selectedAnswer: ''
  }

  handleChange = (value) => {
    this.setState({ selectedAnswer: value })
  }

  handleVote = (answerObj) => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(answerObj))
  }

  render() {
    const { question, authedUser, rogueQuestion,
        questionAnswer, users } = this.props

    if (rogueQuestion) {
      return (
        <div className="container bootstrap snippet">
         <div className="row" >
          <div className="col-md-12">
           <div className="pull-right" style={{marginTop: '10px'}}>
            <div className="col-md-10 col-md-offset-1 pull-right">
             <h2>404 Not Found</h2>
             <p>Sorry, an error has occured, Requested page not found!</p>
             <div className="error-actions">
               <LinkContainer className="nav-link" to="/home">
                 <span className='btn btn-primary btn-lg'>Back Home</span>
               </LinkContainer>
             </div>
            </div>
           </div>
          </div>
         </div>
        </div>
      )
    }

    const optionOneAmount = question.optionOne.votes.length
    const optionTwoAmount = question.optionTwo.votes.length
    const allVotes = optionOneAmount + optionTwoAmount

    const optionOnePercentage = parseInt((optionOneAmount / allVotes) * 100, 10)
    const optionTwoPercentage = parseInt((optionTwoAmount / allVotes) * 100, 10)

    if (questionAnswer === undefined) {
      return (
        <Container style={{ marginTop: '20px', width: '40rem'}} className="justify-content-md-center" >
          <Row className="justify-content-md-center">
            <Card  style={{ width: '36rem' }}>
            <Card.Header style={{ fontWeight: 'bold' }}>{`${users[question.author].name}`} asks:</Card.Header>
              <Card.Body>
                <Media>
                  <img
                    className="avatar-vote align-self-center mr-5 ml-3"
                    src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].avatarURL}`} />
                  <Media.Body className='media-body-vote'>
                    <Container>
                      <Row>
                        <Col md={{ span: 10, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                          <h6>Would you rather...</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={{ span: 10, offset: 1}} style={{ marginBottom: '8px'}} >
                          <RadioGroup name="answers" onChange={this.handleChange}>
                            <Radio value='optionOne'/>&nbsp;&nbsp;{question.optionOne.text}
                            <br/>
                            <Radio value='optionTwo'/>&nbsp;&nbsp;{question.optionTwo.text}
                          </RadioGroup>
                        </Col>
                      </Row>
                      <Row >
                        <Col style={{ fontWeight: 'bold' }} md={{ span: 10, offset: 1 }}>
                        <Button block variant="primary" disabled={this.state.selectedAnswer === '' ? true : false}
                          onClick={() =>this.handleVote({
                            authedUser,
                            qid: question.id,
                            answer: this.state.selectedAnswer
                          })}>
                          Submit
                        </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container style={{ marginTop: '20px', width: '40rem'}} className="justify-content-md-center" >
          <Row className="justify-content-md-center">
            <Card  style={{ width: '36rem' }}>
            <Card.Header style={{ fontWeight: 'bold' }}>Asked by {`${users[question.author].name}`}</Card.Header>
              <Card.Body>
                <Media>
                  <img
                    className="avatar-vote align-self-center mr-5 ml-3"
                    src={users[question.author].avatarURL}
                    alt={`Avatar of ${users[question.author].avatarURL}`} />
                  <Media.Body className='media-body-vote'>
                    <Container>
                      <Row>
                        <Col md={{ span: 10, offset: 1}} style={{ marginBottom: '8px', fontWeight: 'bold'}} >
                          <h6 style={{ marginBottom: '4px', fontWeight: 'bold'}}>Results</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={{ span: 10, offset: 1}} style={{ marginBottom: '8px'}} >
                          <Card bg={users[authedUser].answers[question.id] === 'optionOne' ? 'success' : 'light'}
                                text={users[authedUser].answers[question.id] === 'optionOne' ? 'white' : ''}
                                style={{ width: '18rem' }}>
                            <Card.Body>
                              <Card.Text style={{paddingBottom: '0px'}}>Would you rather {question.optionOne.text}</Card.Text>
                              <ProgressBar now={optionOnePercentage} label={`${optionOnePercentage}%`} />
                              <Card.Text className="text-center">{optionOneAmount} out {allVotes} votes</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={{ span: 10, offset: 1}} style={{ marginBottom: '8px'}} >
                          <Card bg={users[authedUser].answers[question.id] === 'optionTwo' ? 'success' : 'light'}
                                text={users[authedUser].answers[question.id] === 'optionTwo' ? 'white' : ''}
                                style={{ width: '18rem' }}>
                            <Card.Body>
                              <Card.Text style={{paddingBottom: '0px'}}>Would you rather {question.optionTwo.text}</Card.Text>
                              <ProgressBar now={optionTwoPercentage} label={`${optionTwoPercentage}%`}/>
                              <Card.Text className="text-center">{optionTwoAmount} out {allVotes} votes</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </Media.Body>
                </Media>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      )
    }
  }
}


function mapStateToProps({ questions, users, authedUser }, props) {
  const thisQuestionId = props.match.params.question_id
  const question = questions[thisQuestionId]
  const rogueQuestion = !questions[thisQuestionId]
  const questionAnswer = users[authedUser].answers[thisQuestionId]
  return {
    questions,
    question,
    rogueQuestion,
    questionAnswer,
    users,
    authedUser,
    thisQuestionId
  }
}

export default connect(mapStateToProps)(Vote)
