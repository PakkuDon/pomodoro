import * as ActionTypes from '../actions/types'
import initialState from './initialState'

export default (state = initialState.timer, action) => {
  switch (action.type) {
    case ActionTypes.START_TIMER:
      const { workLength, breakLength } = action
      const intervals = [
        {
          name: 'Work',
          length: parseInt(workLength) * 60 * 1000,
          count: 0,
        },
        {
          name: 'Break',
          length: parseInt(breakLength) * 60 * 1000,
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
    case ActionTypes.TIMER_TICK:
      const newTick = Date.now()
      const timeRemaining = state.timeRemaining - (newTick - state.lastTick)

      if (timeRemaining > 0) {
        return {
          ...state,
          timeRemaining,
          lastTick: newTick,
        }
      }
      else {
        const newIntervalIndex = (state.currentIntervalIndex + 1) % state.intervals.length
        return {
          ...state,
          currentIntervalIndex: newIntervalIndex,
          timeRemaining: state.intervals[newIntervalIndex].length,
          lastTick: newTick,
        }
      }
    default:
      return state
  }
}
