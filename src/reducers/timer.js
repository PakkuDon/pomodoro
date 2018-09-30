import * as ActionTypes from '../actions/types'
import initialState from './initialState'

const startTimer = (state, action) => {
  const { workLength, breakLength } = action
  const intervals = [
    {
      name: 'Work',
      length: parseInt(workLength, 10) * 60 * 1000,
      count: 0,
    },
    {
      name: 'Break',
      length: parseInt(breakLength, 10) * 60 * 1000,
      count: 0,
    },
  ]

  return {
    ...state,
    intervals,
    lastTick: Date.now(),
    timeRemaining: intervals[0].length,
    currentIntervalIndex: 0,
  }
}

const timerTick = (state) => {
  const newTick = Date.now()
  const timeRemaining = state.timeRemaining - (newTick - state.lastTick)

  if (timeRemaining > 0) {
    return {
      ...state,
      timeRemaining,
      lastTick: newTick,
    }
  }

  const updatedIntervals = state.intervals.slice()
  updatedIntervals[state.currentIntervalIndex].count += 1
  const newIntervalIndex = (state.currentIntervalIndex + 1) % state.intervals.length

  return {
    ...state,
    intervals: updatedIntervals,
    currentIntervalIndex: newIntervalIndex,
    timeRemaining: state.intervals[newIntervalIndex].length,
    lastTick: newTick,
  }
}

export default (state = initialState.timer, action) => {
  switch (action.type) {
    case ActionTypes.START_TIMER:
      return startTimer(state, action)
    case ActionTypes.TIMER_TICK:
      return timerTick(state)
    default:
      return state
  }
}
