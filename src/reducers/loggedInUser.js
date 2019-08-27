import { SET_LOGGED_IN_USER } from '../actions/loggedInUser'

export default function setLoggedInUser (state = null, action) {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return action.loggedInUser
    default :
      return state
  }
}
