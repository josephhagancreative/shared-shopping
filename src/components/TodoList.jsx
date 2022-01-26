import { useState, useContext } from "react"

import EditModal from "./EditModal"
import ItemsContext from "../context/ItemsContext"
import { v4 as uuidv4 } from "uuid"

import Item from "./Todo"
import "./TodoList.css"

export default function TodoList({ deleteHandler, completeHandler }) {
  // Context
  const { items, setItems, isLoading } = useContext(ItemsContext)

  // state
  const [isEditable, setIsEditable] = useState(false)
  const [itemToEdit, setItemToEdit] = useState({})
  const [updatedText, setUpdatedText] = useState(itemToEdit.text)

  const handleEdit = (id) => {
    setIsEditable(!isEditable)
    const idToEdit = items.filter((item) => item.id === id)
    setItemToEdit(idToEdit[0])
  }

  const updateItem = (e) => {
    e.preventDefault()
    console.log("I don't know what I'm doing")
  }

  const cancelEdit = (e) => {
    if (e.target.matches(".close") || !e.target.closest(".modal")) {
      setIsEditable(false)
    }
  }

  // const deleteHandler = async (id) => {
  //   console.log(id)
  //   const docToDelete = items.filter((doc) => doc.id === id)
  //   console.log(id)
  //   await deleteDoc(doc(db, "list", docToDelete))
  //   const querySnapshot = await getDocs(collection(db, "list"))
  //   querySnapshot.forEach((doc) => {
  //     if (doc.data().id === id) {
  //       deleteDoc(doc(db, "list", docToDelete))
  //     }
  //     console.log(`${doc.id} => ${doc.data().text}`)
  //   })
  //   await deleteDoc(doc(db, "list", id))
  // }

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
