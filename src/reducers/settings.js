import * as ActionTypes from '../actions/types'
import initialState from './initialState'

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case ActionTypes.FLIP_PANEL:
      return {
        ...state,
        flipped: !state.flipped,
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
