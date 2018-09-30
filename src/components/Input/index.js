import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Input = ({ id, placeholder, type, value, onChange }) => (
  <input
    id={id}
    className={styles.root}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
)

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  id: undefined,
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
}

export default Input
