import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const Input = ({ label, placeholder, type, value, onChange }) => (
  <div>
    <label className={styles.label}>
      {label}
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  </div>
)
Input.propTypes = {
  label: PropTypes.string,
  placholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
Input.defaultProps = {
  type: 'text',
  onChange: () => {},
}

export default Input
