import 'normalize'
import './styles.css'

import Timer from './timer'

const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

const workDurationInput = document.querySelector('#work-duration')
const breakDurationInput = document.querySelector('#break-duration')
const intervalNameElem = document.querySelector('.interval-name')
const startButton = document.querySelector('#start-button')
const stopButton = document.querySelector('#stop-button')

let animationID

stopButton.style.display = 'none'

startButton.addEventListener('click', () => {
  clearInterval(animationID)

  startButton.style.display = 'none'
  stopButton.style.display = 'inline-block'

  let workDuration = getWorkDuration()
  let breakDuration = getBreakDuration()
  Timer.start(workDuration, breakDuration)
  displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())
  displayIntervalName(Timer.getCurrentIntervalName())

  animationID = setInterval(() => {
    Timer.tick()
    displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())
    displayIntervalName(Timer.getCurrentIntervalName())
  }, 1000)
})

stopButton.addEventListener('click', () => {
  clearInterval(animationID)

  startButton.style.display = 'inline-block'
  stopButton.style.display = 'none'
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

const displayIntervalName = (name) => {
  intervalNameElem.textContent = name
}

Timer.addEventListener('interval-end', (e) => {
  const notificationText = `
    ${Timer.getPreviousIntervalName()} finished.
    Starting ${Timer.getCurrentIntervalName()}
  `
  new Notification('Pomodoro', {
    body: notificationText,
  })
})
