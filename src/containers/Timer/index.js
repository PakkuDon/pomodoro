import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'

const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / (60 * 1000))
  const seconds = Math.round((milliseconds / 1000) % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
const formatIntervalCount = (count) => (
  `${count} ${count === 1 ? 'unit' : 'units'} completed`
)

const Timer = ({ intervalName, count, timeRemaining, duration, onStop }) => (
  <div className="panel timer-view">
    <div className="interval-name">{intervalName}</div>
    <div className="interval-count">{formatIntervalCount(count)}</div>
    <div className="timer">{formatTime(timeRemaining)}</div>
    <ProgressBar value={duration - timeRemaining} max={duration} />
    <div>
      <Button onClick={onStop}>
        <svg width="24" height="24" viewBox="0 0 16 16" fill="#FFF">
          <rect x="0" y="0" width="16" height="16" />
        </svg>
      </Button>
    </div>
    <audio src="chime.mp3" />
  </div>
)

Timer.propTypes = {
  intervalName: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onStop: PropTypes.func.isRequired,
}

export default Timer
