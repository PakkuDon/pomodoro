import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const ProgressBar = ({ value, max }) => <progress className={styles.root} value={value} max={max} />

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number.isRequired,
}
ProgressBar.defaultProps = {
  value: 0,
}

export default ProgressBar
