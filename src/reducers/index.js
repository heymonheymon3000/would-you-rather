import { combineReducers } from 'redux'
import loggedInUser from './loggedInUser'
import users from './users'
import questions from './questions'

export default combineReducers({
  loggedInUser,
  questions,
  users,
})
