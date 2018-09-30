import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

/* eslint-disable jsx-a11y/label-has-for */
const Label = ({ htmlFor, children }) => (
  <label className={styles.root} htmlFor={htmlFor}>
    {children}
  </label>
)
/* eslint-enable jsx-a11y/label-has-for */

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default Label
