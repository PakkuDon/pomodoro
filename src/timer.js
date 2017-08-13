let durations = []
let currentDurationIndex = 0
let timeRemaining = 0
let lastTick = Date.now()

export default {
  start(workDurtionMinutes, breakDurationMinutes) {
    lastTick = Date.now()
    durations.push(workDurtionMinutes * 60 * 1000)
    durations.push(breakDurationMinutes * 60 * 1000)
    currentDurationIndex = 0
    timeRemaining = durations[currentDurationIndex]
  },
  tick() {
    let newTick = Date.now()
    timeRemaining -= newTick - lastTick
    if (timeRemaining <= 0) {
      currentDurationIndex = (currentDurationIndex + 1) % durations.length
      timeRemaining = durations[currentDurationIndex]
    }

    lastTick = newTick
  },
  getDuration() {
    return durations[currentDurationIndex]
  },
  getTimeRemaing() {
    return timeRemaining
  }
}
