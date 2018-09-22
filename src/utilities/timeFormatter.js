export default (milliseconds) => {
  const minutes = Math.floor(milliseconds / (60 * 1000))
  const seconds = Math.round((milliseconds / 1000) % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
