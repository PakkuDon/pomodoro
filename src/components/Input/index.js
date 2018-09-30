import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Input = ({ placeholder, type, value, onChange }) => (
  <input
    className={styles.root}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
)
Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
Input.defaultProps = {
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
}

export default Input
