let durations = []
let currentDurationIndex = 0
let timeRemaining = 0
let lastTick = Date.now()
let eventHandlers = {}

export default {
  start(workDurtionMinutes, breakDurationMinutes) {
    durations = []
    currentDurationIndex = 0

    lastTick = Date.now()
    durations.push({
      name: 'Work',
      length: workDurtionMinutes * 60 * 1000,
    })
    durations.push({
      name: 'Break',
      length: breakDurationMinutes * 60 * 1000,
    })

    timeRemaining = this.getDuration()
  },
  tick() {
    let newTick = Date.now()
    timeRemaining -= newTick - lastTick
    if (timeRemaining <= 0) {
      currentDurationIndex = (currentDurationIndex + 1) % durations.length
      timeRemaining = this.getDuration()
    }

    lastTick = newTick
  },
  getCurrentIntervalName() {
    return durations[currentDurationIndex].name
  },
  getDuration() {
    return durations[currentDurationIndex].length
  },
  getTimeRemaing() {
    return timeRemaining
  },
  addEventListener(type, listener) {
    if (!eventHandlers[type]) {
      eventHandlers[type] = []
    }
    eventHandlers[type].push(listener)
  },
  dispatchEvent(type, event) {
    if (!eventHandlers[type]) return
    eventHandlers[type].forEach((handler) => { handler(event) })
  },
}
