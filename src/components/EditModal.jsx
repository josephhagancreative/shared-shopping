import "./EditModal.css"

import React from "react"

export default function EditModal({
  cancelEdit,
  updateItem,
  updatedText,
  setUpdatedText,
}) {
  const handleChange = (e) => {
    setUpdatedText(e.target.value)
  }

  return (
    <div className="modalContainer" onClick={cancelEdit}>
      <div className="modal">
        <div className="modalHeader">Edit Item:</div>

        <form className="modalForm" onSubmit={updateItem}>
          <input
            type="text"
            name="edit"
            id="edit"
            value={updatedText}
            onChange={handleChange}></input>
          <button type="submit" className="btn updateBtn">
            Update
          </button>
        </form>
        <div className="close closeBtn">
          <i className="fas fa-times close"></i>
        </div>
      </div>
    </div>
  )
}
