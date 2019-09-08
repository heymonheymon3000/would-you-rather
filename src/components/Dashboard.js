import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../css/dashboard.css'
import { createSelector } from 'reselect'
import { Tabs, Tab, Container }  from 'react-bootstrap'

class Dashboard extends Component {
  render() {
    const { unansweredQuestions, answeredQuestions } = this.props

    return (
      <Container style={{ marginTop: '20px', width: '40rem'}} className="justify-content-md-center" >
        <Tabs className='tab-container' fill justify defaultActiveKey="uaq">
          <Tab eventKey="uaq" title="Unanswered Questions">
            {unansweredQuestions.map(id => (
              <div key={id} className="justify-content-md-center">
                <Question id={id} />
                <br/>
              </div>
            ))}
          </Tab>
          <Tab eventKey="aq" title="Answered Questions" >
            {answeredQuestions.map(id => (
              <div key={id} className="justify-content-md-center">
                <Question id={id} />
                <br/>
              </div>
            ))}
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const getUnansweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  state => Object.keys(state.questions),
  (questions, answeredQuestions, questionsId) =>
    questionsId
      .filter(id => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

const getAnsweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  (questions, answers) =>
    answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

function mapStateToProps(state) {
  const { users, questions } = state
  return {
    users,
    questions,
    answeredQuestions: getAnsweredQuestions(state),
    unansweredQuestions: getUnansweredQuestions(state)
  }
}

export default connect(mapStateToProps)(Dashboard)
