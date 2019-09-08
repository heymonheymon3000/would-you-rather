import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/new-question.css'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Form, Container, Row, Card, Button } from 'react-bootstrap';

class AddQuestion extends Component {
  state = {
    redirectHome: false,
    optionOneText: '',
    optionTwoText: ''
  }

  noticeChange = e => {
    const text = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: text
    }))
  }

  createQuestion = e => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(
      handleSaveQuestion({ optionOneText, optionTwoText, authedUser })
    ).then(() =>
      this.setState(() => ({
        redirectHome: true
      }))
    )
  }

  render() {
    const { redirectHome, optionOneText, optionTwoText } = this.state
    const dontPost = optionOneText === '' ? true : optionTwoText === ''

    if (redirectHome) {
      return <Redirect to={`/home`} />
    }

    return (
      <Container style={{ marginTop: '20px', width: '40rem'}}>
        <Row className="justify-content-md-center">
          <Card style={{ width: '40rem' }}>
            <Card.Header className="text-center"><h5><strong>Create New Question</strong></h5></Card.Header>
            <div style={{fontSize: '12px', paddingLeft: '8px'}} className="text-left">Complete the question:</div>
            <Form>
              <div style={{fontSize: '16px', fontWeight: 'bold', paddingLeft: '8px', paddingTop: '18px'}}>Would you rather...</div>
              <Form.Group style={{paddingLeft: '8px', paddingRight: '8px'}}>
                <Form.Control type="text" placeholder="Enter Option One Text Here"
                  onChange={this.noticeChange}
                  value={optionOneText}
                  name="optionOneText"/>
                <div className="text-center" style={{fontSize: '16px', fontWeight: 'bold', paddingBottom: '8px', paddingTop: '8px'}}>OR</div>
                <Form.Control type="text" placeholder="Enter Option Two Text Here"
                  onChange={this.noticeChange}
                  value={optionTwoText}
                  name="optionTwoText"/>
                <Button style={{marginTop: '16px'}} block onClick={this.createQuestion} disabled={dontPost}>Submit</Button>
              </Form.Group>
            </Form>
          </Card>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AddQuestion)
