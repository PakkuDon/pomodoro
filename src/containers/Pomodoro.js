import React, { Component, Fragment } from 'react'
import Settings from './Settings'
import Timer from './Timer'
import TimerModel from '../timer'

class Pomodoro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intervalName: '',
      timeRemaining: 0,
      duration: 0,
      count: 0,
    }
  }

  componentDidMount() {
    TimerModel.start(25, 5)
    setInterval(() => {
      TimerModel.tick()
      this.setState({
        intervalName: TimerModel.getCurrentIntervalName(),
        timeRemaining: TimerModel.getTimeRemaing(),
        duration: TimerModel.getDuration(),
        count: TimerModel.getCurrentIntervalCount(),
      })
    }, 1000)
  }

  render() {
    const { intervalName, timeRemaining, duration, count } = this.state

    return (
      <Fragment>
        <Settings />
        <Timer
          intervalName={intervalName}
          timeRemaining={timeRemaining}
          duration={duration}
          count={count}
        />
      </Fragment>
    )
  }
}

export default Pomodoro
