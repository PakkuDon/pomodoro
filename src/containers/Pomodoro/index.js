import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Settings from '../Settings'
import Timer from '../Timer'
import { editSetting, startTimer, stopTimer, tick } from '../../actions'

class Pomodoro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intervalId: '',
    }

    this.onSettingEdit = this.onSettingEdit.bind(this)
    this.onTimerStart = this.onTimerStart.bind(this)
    this.onTimerStop = this.onTimerStop.bind(this)
  }

  onSettingEdit(field, value) {
    this.props.onEditSetting(field, value)
  }

  onTimerStart() {
    const { intervalId } = this.state
    const {
      breakLength,
      onStartTimer,
      onTick,
      workLength,
    } = this.props
    window.clearInterval(intervalId)

    onStartTimer(workLength, breakLength)
    const newIntervalId = setInterval(() => {
      onTick()
    }, 1000)
    this.setState({
      intervalId: newIntervalId,
    })
  }

  onTimerStop() {
    window.clearInterval(this.state.intervalId)
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
      duration: currentInterval.length,
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