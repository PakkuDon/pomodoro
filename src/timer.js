let duration = 0
let timeRemaining = 0
let lastTick = Date.now()

export default {
  start(durationMinutes) {
    lastTick = Date.now()
    duration = durationMinutes * 60 * 1000
    timeRemaining = duration
  },
  tick() {
    let newTick = Date.now()
    timeRemaining -= newTick - lastTick
    if (timeRemaining < 0) {
      timeRemaining = 0
    }

    lastTick = newTick
  },
  getDuration() {
    return duration
  },
  getTimeRemaing() {
    return timeRemaining
  }
}
