import { useState, useContext } from "react"

import ItemsContext from "../context/ItemsContext"

import Item from "./Todo"
import "./TodoList.css"

export default function TodoList({ deleteHandler, completeHandler }) {
  // Context
  const { items, isLoading } = useContext(ItemsContext)

  // state
  const [isEditable, setIsEditable] = useState(false)
  const [itemToEdit, setItemToEdit] = useState({})

  const handleEdit = (id) => {
    setIsEditable(!isEditable)
    const idToEdit = items.filter((item) => item.id === id)
    setItemToEdit(idToEdit[0])
  }

  if (!isLoading) {
    return (
      <>
        <div className="todo-container">
          <ul className="todo-list">
            {items.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                text={item.text}
                item={item.data}
                quantity={item.quantity}
                category={item.category}
                isComplete={item.isComplete}
                handleEdit={handleEdit}
                deleteHandler={deleteHandler}
                completeHandler={completeHandler}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>TodoList</h1>
    </>
  )
}
