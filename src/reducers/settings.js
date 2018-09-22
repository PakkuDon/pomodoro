import * as ActionTypes from '../actions/types'
import initialState from './initialState'

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case ActionTypes.START_TIMER:
      return {
        ...state,
        flipped: true,
      }
    case ActionTypes.STOP_TIMER:
      return {
        ...state,
        flipped: false,
      }
    case ActionTypes.EDIT_SETTING:
      return {
        ...state,
        [action.field]: action.value,
      }
    default:
      return state
  }
}
