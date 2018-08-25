import * as ActionTypes from './types'

export const startTimer = (workLength, breakLength) => ({
  type: ActionTypes.START_TIMER,
  workLength,
  breakLength,
})

export const stopTimer = () => ({
  type: ActionTypes.STOP_TIMER,
})

export const tick = () => ({
  type: ActionTypes.TIMER_TICK,
})

export const editSetting = (field, value) => ({
  type: ActionTypes.EDIT_SETTING,
  field,
  value,
})
