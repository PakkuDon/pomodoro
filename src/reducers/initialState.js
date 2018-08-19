export default {
  settings: {
    flipped: false,
    workLength: '25',
    breakLength: '5',
  },
  timer: {
    intervals: [],
    lastTick: Date.now(),
    timeRemaining: 0,
    currentIntervalIndex: 0,
  },
}
