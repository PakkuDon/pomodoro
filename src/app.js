import 'normalize'
import './styles.css'

import Timer from './timer'

const pomodoroElement = document.querySelector('.container')
const timerDisplay = document.querySelector('.timer')
const timerProgress = document.querySelector('progress')

const workDurationInput = document.querySelector('#work-duration')
const breakDurationInput = document.querySelector('#break-duration')
const intervalNameElem = document.querySelector('.interval-name')
const intervalCountElem = document.querySelector('.interval-count')
const startButton = document.querySelector('#start-button')
const stopButton = document.querySelector('#stop-button')
const chimeSound = document.querySelector('audio')

let animationID

const getWorkDuration = () => parseInt(workDurationInput.value)
const getBreakDuration = () => parseInt(breakDurationInput.value)

const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / (60 * 1000))
  const seconds = Math.round((milliseconds / 1000) % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const displayTimeRemaining = (timeRemaining, duration) => {
  const remainingTimeFormatted = formatTime(timeRemaining)

  timerDisplay.textContent = remainingTimeFormatted
  timerProgress.max = duration
  timerProgress.value = duration - timeRemaining
}

const displayIntervalName = (name) => {
  intervalNameElem.textContent = name
}

const displayCurrentIntervalCount = (count) => {
  intervalCountElem.textContent = `${count} ${count === 1 ? 'unit' : 'units'} completed`
}

const updatePageTitle = (timeRemaining) => {
  if (!timeRemaining) {
    document.title = 'Pomodoro'
  }
  else {
    document.title = `${formatTime(timeRemaining)} - Pomodoro`
  }
}

startButton.addEventListener('click', () => {
  clearInterval(animationID)

  pomodoroElement.classList.add('flipped')

  let workDuration = getWorkDuration()
  let breakDuration = getBreakDuration()
  Timer.start(workDuration, breakDuration)
  displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())
  displayIntervalName(Timer.getCurrentIntervalName())
  displayCurrentIntervalCount(Timer.getCurrentIntervalCount())
  updatePageTitle(Timer.getTimeRemaing())

  animationID = setInterval(() => {
    Timer.tick()
    displayTimeRemaining(Timer.getTimeRemaing(), Timer.getDuration())
    displayIntervalName(Timer.getCurrentIntervalName())
    displayCurrentIntervalCount(Timer.getCurrentIntervalCount())
    updatePageTitle(Timer.getTimeRemaing())
  }, 1000)
})

stopButton.addEventListener('click', () => {
  clearInterval(animationID)
  pomodoroElement.classList.remove('flipped')
  updatePageTitle()
})

Timer.addEventListener('interval-end', (e) => {
  const notificationText = `
    ${Timer.getPreviousIntervalName()} finished
    Starting ${Timer.getCurrentIntervalName()}
  `.trim()

  new Notification('Pomodoro', {
    body: notificationText,
  })

  chimeSound.currentTime = 0
  chimeSound.play()
})
