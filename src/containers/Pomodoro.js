import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from './Settings'
import Timer from './Timer'
import { editSetting, startTimer, stopTimer, tick } from '../actions'
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

    TimerModel.addEventListener('interval-end', () => {
      const notificationText = `
        ${TimerModel.getPreviousIntervalName()} finished
        Starting ${TimerModel.getCurrentIntervalName()}
      `.trim()

      // eslint-disable-next-line no-new
      new Notification('Pomodoro', {
        body: notificationText,
      })
    })
  }

  onSettingEdit(field, value) {
    this.setState({
      settings: {
        ...this.state.settings,
        [field]: value,
      },
    })
    this.props.onEditSetting(field, value)
  }

  onTimerStart() {
    const { intervalId, settings } = this.state
    const {
      breakLength,
      onStartTimer,
      onTick,
      workLength,
    } = this.props
    window.clearInterval(intervalId)

    onStartTimer(workLength, breakLength)
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
      onTick()
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
    this.props.onStopTimer()
  }

  render() {
    const {
      flipped,
      workLength,
      breakLength,
      intervalName,
      duration,
      count,
      timeRemaining
    } = this.props

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

Pomodoro.propTypes = {
  flipped: PropTypes.bool,
  workLength: PropTypes.string,
  breakLength: PropTypes.string,
  intervalName: PropTypes.string,
  duration: PropTypes.number,
  count: PropTypes.number,
  timeRemaining: PropTypes.number,
  onEditSetting: PropTypes.func,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
  onTick: PropTypes.func,
}

export default connect(
  ({ settings, timer }) => {
    const currentInterval = timer.intervals[timer.currentIntervalIndex]

    return {
      flipped: settings.flipped,
      workLength: settings.workLength,
      breakLength: settings.breakLength,
      intervalName: currentInterval.name,
      duration: currentInterval.duration,
      count: currentInterval.count,
      timeRemaining: timer.timeRemaining,
    }
  },
  {
    onEditSetting: editSetting,
    onStartTimer: startTimer,
    onStopTimer: stopTimer,
    onTick: tick,
  },
)(Pomodoro)
