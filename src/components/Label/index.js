import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

/* eslint-disable jsx-a11y/label-has-for */
const Label = ({ id, htmlFor, children }) => (
  <label id={id} className={styles.root} htmlFor={htmlFor}>
    {children}
  </label>
)
/* eslint-enable jsx-a11y/label-has-for */

Label.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

Label.defaultProps = {
  id: undefined,
}

export default Label
