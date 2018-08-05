import React from 'react'

const Timer = () => (
  <div className="panel timer-view">
    <div className="interval-name">
      &nbsp;
    </div>
    <div className="interval-count">
      &nbsp;
    </div>
    <div className="timer">
      0:00
    </div>
    <progress value="0" max="0"></progress>
    <div>
      <button className="action" id="stop-button">
        <svg width="24" height="24" viewBox="0 0 16 16" fill="#FFF">
          <rect x="0" y="0" width="16" height="16" />
        </svg>
      </button>
    </div>
    <audio src="chime.mp3"></audio>
  </div>
)

export default Timer
