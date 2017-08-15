import 'normalize'
import './styles.css'

import Timer from './timer'

const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

const workDurationInput = document.querySelector('#work-duration')
const breakDurationInput = document.querySelector('#break-duration')
const startButton = document.querySelector('.actions button')

let animationID

startButton.addEventListener('click', () => {
  clearInterval(animationID)

  let workDuration = getWorkDuration()
  let breakDuration = getBreakDuration()
  Timer.start(workDuration, breakDuration)
  displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())

  animationID = setInterval(() => {
    Timer.tick()
    displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())
  }, 1000)
})

const getWorkDuration = () => parseInt(workDurationInput.value)
const getBreakDuration = () => parseInt(breakDurationInput.value)

const displayTimeRemaining = (timeRemaining, duration) => {
  const minutes = Math.floor(timeRemaining / (60 * 1000))
  const seconds = Math.round((timeRemaining / 1000) % 60)
  const remainingTimeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  timerDisplay.textContent = remainingTimeFormatted
  timerProgress.max = duration
  timerProgress.value = duration - timeRemaining
}
