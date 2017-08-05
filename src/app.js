import 'normalize'
import './styles.css'

const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

let initialDuration = 25 * 60 * 1000
let timeRemaining = initialDuration

let animationID = setInterval(() => {
  timeRemaining -= 1000

  if (timeRemaining < 0) {
    timeRemaining = 0
    clearInterval(animationID)
  }

  const minutes = Math.floor(timeRemaining / (60 * 1000))
  const seconds = (timeRemaining / 1000) % 60
  const remainingTimeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  timerDisplay.textContent = remainingTimeFormatted
  timerProgress.max = initialDuration
  timerProgress.value = initialDuration - timeRemaining
}, 1000)
