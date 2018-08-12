import React from 'react'
import PropTypes from 'prop-types'

const Settings = ({ onEdit, onSubmit, workLength, breakLength }) => {
  const onSettingEdit = (field) => ((event) => onEdit(field, event.target.value))

  return (
    <div className="panel settings-view">
      <div>
        <label htmlFor="work-duration">Work</label>
        <input
          id="work-duration"
          type="number"
          value={workLength}
          placeholder="Work length"
          onChange={onSettingEdit('workLength')}
        />
      </div>
      <div>
        <label htmlFor="break-duration">Break</label>
        <input
          id="break-duration"
          type="number"
          value={breakLength}
          placeholder="Break length"
          onChange={onSettingEdit('breakLength')}
        />
      </div>
      <div>
        <button className="action" id="start-button" onClick={onSubmit}>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="#FFF">
            <polygon points="0 0, 16 8, 0 16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
Settings.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  workLength: PropTypes.string.isRequired,
  breakLength: PropTypes.string.isRequired,
}

export default Settings
