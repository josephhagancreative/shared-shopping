// styles
import "./Todo.css"

export default function Item({
  items,
  item,
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
      case "🍎":
        classAttribute = "food"
        return classAttribute
      case "🍹":
        classAttribute = "drink"
        return classAttribute
      case "🧼":
        classAttribute = "household"
        return classAttribute
      case "🖥️":
        classAttribute = "tech"
        return classAttribute
      case "📙":
        classAttribute = "book"
        return classAttribute
      case "👖":
        classAttribute = "clothing"
        return classAttribute
      case "":
        classAttribute = ""
        return classAttribute
      default:
        classAttribute = ""
        return classAttribute
    }
  }

  return (
    <div className="todo">
      <div className="itemDetails">
        <li className={`todo-item ${isComplete ? "completed" : ""}  `}>
          {text.trim()}
        </li>
        <span
          className={`quantitySpan ${
            isComplete ? "completed" : ""
          } ${categoryColor()} `}>
          {quantity.trim() + " "}
          {category}
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
