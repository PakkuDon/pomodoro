import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Button = ({ onClick, children }) => (
  <button className={styles.root} type="button" onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
}

Button.defaultProps = {
  onClick: () => {},
  children: '',
}

export default Button
