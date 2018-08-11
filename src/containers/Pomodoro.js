import React, { Component } from 'react'
import Settings from './Settings'
import Timer from './Timer'
import TimerModel from '../timer'

class Pomodoro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flipped: true,
      timer: {
        intervalName: '',
        timeRemaining: 0,
        duration: 0,
        count: 0,
      },
    }
  }

  componentDidMount() {
    TimerModel.start(25, 5)
    setInterval(() => {
      TimerModel.tick()
      this.setState({
        timer: {
          intervalName: TimerModel.getCurrentIntervalName(),
          timeRemaining: TimerModel.getTimeRemaing(),
          duration: TimerModel.getDuration(),
          count: TimerModel.getCurrentIntervalCount(),
        },
      })
    }, 1000)
  }

  render() {
    const { flipped, timer } = this.state
    const { intervalName, timeRemaining, duration, count } = timer

    return (
      <div className={`container ${flipped ? 'flipped' : ''}`}>
        <Settings />
        <Timer
          intervalName={intervalName}
          timeRemaining={timeRemaining}
          duration={duration}
          count={count}
        />
      </div>
    )
  }
}

export default Pomodoro
