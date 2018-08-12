import React, { Component } from 'react'
import Settings from './Settings'
import Timer from './Timer'
import TimerModel from '../timer'

class Pomodoro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flipped: false,
      intervalId: '',
      settings: {
        workLength: '25',
        breakLength: '5',
      },
      timer: {
        intervalName: '',
        timeRemaining: 0,
        duration: 0,
        count: 0,
      },
    }

    this.onSettingEdit = this.onSettingEdit.bind(this)
    this.onTimerStart = this.onTimerStart.bind(this)
    this.onTimerStop = this.onTimerStop.bind(this)
  }

  onSettingEdit(field, value) {
    this.setState({
      settings: Object.assign(this.state.settings, { [field]: value }),
    })
  }

  onTimerStart() {
    const { intervalId, settings } = this.state
    window.clearInterval(intervalId)

    TimerModel.start(settings.workLength, settings.breakLength)
    const newIntervalId = setInterval(() => {
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
    this.setState({
      flipped: true,
      intervalId: newIntervalId,
    })
  }

  onTimerStop() {
    window.clearInterval(this.state.intervalId)
    this.setState({
      flipped: false,
    })
  }

  render() {
    const { flipped, settings, timer } = this.state
    const { workLength, breakLength } = settings
    const { intervalName, timeRemaining, duration, count } = timer

    return (
      <div className={`container ${flipped ? 'flipped' : ''}`}>
        <Settings
          workLength={workLength}
          breakLength={breakLength}
          onEdit={this.onSettingEdit}
          onSubmit={this.onTimerStart}
        />
        <Timer
          intervalName={intervalName}
          timeRemaining={timeRemaining}
          duration={duration}
          count={count}
          onStop={this.onTimerStop}
        />
      </div>
    )
  }
}

export default Pomodoro
