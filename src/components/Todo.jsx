import { useState } from "react"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useAuthContext } from "../hooks/useAuthContext"

// styles
import "./Todo.css"

export default function Item({
  id,
  text,
  category,
  quantity,
  isComplete,
  deleteHandler,
  completeHandler,
}) {
  const [isEditable, setIsEditable] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(text)
  const { user } = useAuthContext()

  const handleEdit = () => {
    setIsEditable(!isEditable)
  }

  const handleMutate = (e) => {
    setItemToEdit(e.target.value)
  }

  const submitEdit = async (id) => {
    const docRef = doc(db, "users", user.uid, "list", id)

    await updateDoc(docRef, {
      text: itemToEdit,
    }).then(setIsEditable(false))
  }

  const categoryColor = () => {
    let classAttribute = ""
    switch (category) {
      case "No Priority":
        classAttribute = "priority-0"
        return classAttribute
      case "urgent":
        classAttribute = "priority-3"
        return classAttribute
      case "soon":
        classAttribute = "priority-2"
        return classAttribute
      case "non-urgent":
        classAttribute = "priority-1"
        return classAttribute
      default:
        classAttribute = "priority-0"
        return classAttribute
    }
  }

  return (
    <div className="todo">
      <div className="itemDetails">
        {/* Edit Mode */}
        {isEditable ? (
          <form className="editForm">
            <div className="editWrapper">
              <input
                id="editInput"
                className="todo-item todoEdit"
                onChange={(e) => handleMutate(e)}
                onBlur={() => submitEdit(id)}
                value={itemToEdit}
              />
            </div>

            <button
              type="submit"
              className="complete-btn"
              onClick={() => submitEdit(id)}>
              <i className="far fa-save"></i>
            </button>
          </form>
        ) : (
          // RegularForm
          <>
            <li
              className={`todo-item ${isComplete ? "completed" : ""}  `}
              onClick={(e) => completeHandler(id, e)}>
              <p className="listItemName" onClick={() => handleEdit()}>
                {text.trim()}
              </p>
              {quantity !== "" && (
                <span className="quantitySpan">{quantity.trim() + " "}</span>
              )}

              {category !== "" && (
                <span
                  className={`small quantitySpan ${
                    isComplete ? "completed" : ""
                  } ${categoryColor()} `}>
                  {category}
                </span>
              )}
            </li>
            <div className="itemButtons">
              {!isEditable && (
                <>
                  <button
                    className="complete-btn"
                    onClick={() => completeHandler(id)}>
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    className="trash-btn"
                    onClick={() => deleteHandler(id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
