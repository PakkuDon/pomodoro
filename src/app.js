import 'normalize'
import './styles.css'

import Timer from './timer'

const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

const workDurationInput = document.querySelector('#work-duration')
const startButton = document.querySelector('.actions button')

const initialDuration = 1
let animationID

startButton.addEventListener('click', () => {
  clearInterval(animationID)

  let workDuration = parseInt(workDurationInput.value)
  Timer.start(workDuration)

  animationID = setInterval(() => {
    Timer.tick()
    const timeRemaining = Timer.getTimeRemaing();
    const timeDuration = Timer.getDuration()

    if (timeRemaining <= 0) {
      clearInterval(animationID)
    }

    const minutes = Math.floor(timeRemaining / (60 * 1000))
    const seconds = (timeRemaining / 1000) % 60
    const remainingTimeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

    timerDisplay.textContent = remainingTimeFormatted
    timerProgress.max = timeDuration
    timerProgress.value = timeDuration - timeRemaining
  }, 1000)
})
