import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Button = ({ id, onClick, children }) => (
  <button id={id} className={styles.root} type="button" onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

Button.defaultProps = {
  id: undefined,
  onClick: () => {},
  children: '',
}

export default Button
