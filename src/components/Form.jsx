import { useState, useContext } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase.config"
import { v4 as uuidv4 } from "uuid"
import ItemsContext from "../context/ItemsContext"

// Styles
import "./Form.css"

export default function Form({
  inputText,
  setInputText,
  setStatus,
  inputQuantity,
  setInputQuantity,
  inputCategory,
  setInputCategory,
  fetchItems,
}) {
  // Context
  const { items, setItems } = useContext(ItemsContext)

  const [errorMsg, setErrorMsg] = useState("")

  const inputTextHandler = (e) => {
    setInputText(e.target.value)
  }
  const inputQuantityHandler = (e) => {
    setInputQuantity(e.target.value)
  }
  const inputCategoryHandler = (e) => {
    setInputCategory(e.target.value)
  }
  const submitItemHandler = async (e) => {
    e.preventDefault()
    if (inputText.length > 0) {
      // setItems([
      //   ...items,
      //   {
      //     text: inputText,
      //     quantity: inputQuantity,
      //     category: inputCategory,
      //     isComplete: false,
      //     id: uuidv4(),
      //   },
      // ])
      const todoToAdd = {
        text: inputText,
        quantity: inputQuantity,
        category: inputCategory,
        isComplete: false,
      }

      const docRef = await addDoc(collection(db, "list"), todoToAdd)

      setInputText("")
      setInputQuantity("")
      fetchItems()
    } else {
      setErrorMsg("Please enter an Item!")
      setTimeout(() => {
        setErrorMsg("")
      }, 3000)
    }
  }
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }
  return (
    <>
      <form className="formForm" onSubmit={submitItemHandler}>
        <div className="inputContainer">
          <input
            onChange={inputTextHandler}
            type="text"
            className="todo-input"
            value={inputText}
            placeholder="Item"
          />
          <input
            onChange={inputQuantityHandler}
            type="text"
            className="todo-input"
            value={inputQuantity}
            placeholder="Quantity"
          />
          <div className="select">
            <select
              onChange={inputCategoryHandler}
              name="todos"
              className="filter-todo">
              <option disabled value="">
                --Select Category --
              </option>
              <option value="(other)">No Category</option>
              <option value="(food)">Food</option>
              <option value="(drink)">Drink</option>
              <option value="(household)">Household</option>
              <option value="(tech)">Technology</option>
              <option value="(media)">Books/Stationary</option>
              <option value="(clothes)">Clothing</option>
            </select>
            <button className="todo-button" type="submit">
              <p>Add Item</p> <i className="fas fa-plus-square"></i>
            </button>
          </div>
        </div>
      </form>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </>
  )
}
