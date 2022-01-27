// styles
import "./Todo.css"

export default function Item({
  id,
  text,
  category,
  quantity,
  isComplete,
  handleEdit,
  deleteHandler,
  completeHandler,
}) {
  const categoryColor = () => {
    let classAttribute = ""
    switch (category) {
      case "(food)":
        classAttribute = "food"
        return classAttribute
      case "(drinks)":
        classAttribute = "drink"
        return classAttribute
      case "(household)":
        classAttribute = "household"
        return classAttribute
      case "(tech)":
        classAttribute = "tech"
        return classAttribute
      case "(media)":
        classAttribute = "book"
        return classAttribute
      case "(clothes)":
        classAttribute = "clothing"
        return classAttribute
      case "(other)":
        classAttribute = "other"
        return classAttribute
      default:
        classAttribute = "other"
        return classAttribute
    }
  }

  return (
    <div className="todo">
      <div className="itemDetails" onClick={() => completeHandler(id)}>
        <li className={`todo-item ${isComplete ? "completed" : ""}  `}>
          {text.trim()}
        </li>
        <span
          className={`quantitySpan ${
            isComplete ? "completed" : ""
          } ${categoryColor()} `}>
          {quantity.trim() + " "}
          <span className="small">{category}</span>
        </span>
      </div>
      <div className="itemButtons">
        <button className="complete-btn" onClick={() => completeHandler(id)}>
          <i className="fas fa-check"></i>
        </button>
        <button className="edit-btn" onClick={() => handleEdit(id)}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="trash-btn" onClick={() => deleteHandler(id)}>
          <i className="fas fa-trash "></i>
        </button>
      </div>
    </div>
  )
}
