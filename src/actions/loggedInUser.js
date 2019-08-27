export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

export function setLoggedInUser (loggedInUser) {
  return {
    type: SET_LOGGED_IN_USER,
    loggedInUser,
  }
}
