import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'
import formatTime from '../../utilities/timeFormatter'

import styles from './styles.css'
import chimeSfx from '../../chime.mp3'

const formatIntervalCount = (count) => `${count} ${count === 1 ? 'unit' : 'units'} completed`

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.audioChime = React.createRef()
  }

  componentDidUpdate(previousProps) {
    if (this.props.intervalName !== previousProps.intervalName) {
      this.audioChime.current.play()
    }
  }

  render() {
    const { intervalName, count, timeRemaining, duration, onStop } = this.props

    return (
      <div className={styles.root}>
        <div>{intervalName}</div>
        <div>{formatIntervalCount(count)}</div>
        <div className={styles.timeRemaining}>{formatTime(timeRemaining)}</div>
        <ProgressBar value={duration - timeRemaining} max={duration} />
        <div>
          <Button onClick={onStop}>
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#FFF">
              <rect x="0" y="0" width="16" height="16" />
            </svg>
          </Button>
        </div>
        <audio ref={this.audioChime} src={chimeSfx} />
      </div>
    )
  }
}

Timer.propTypes = {
  intervalName: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  timeRemaining: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onStop: PropTypes.func.isRequired,
}

export default Timer
