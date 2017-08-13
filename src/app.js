import 'normalize'
import './styles.css'

import Timer from './timer'

const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

const workDurationInput = document.querySelector('#work-duration')
const breakDurationInput = document.querySelector('#break-duration')
const startButton = document.querySelector('.actions button')

const initialDuration = 1
let animationID

startButton.addEventListener('click', () => {
  clearInterval(animationID)

  let workDuration = parseInt(workDurationInput.value)
  let breakDuration = parseInt(breakDurationInput.value)
  Timer.start(workDuration, breakDuration)

  animationID = setInterval(() => {
    Timer.tick()
    const timeRemaining = Timer.getTimeRemaing();
    const timeDuration = Timer.getDuration()

    const minutes = Math.floor(timeRemaining / (60 * 1000))
    const seconds = (timeRemaining / 1000) % 60
    const remainingTimeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    timerDisplay.textContent = remainingTimeFormatted
    timerProgress.max = timeDuration
    timerProgress.value = timeDuration - timeRemaining
  }, 1000)
})
