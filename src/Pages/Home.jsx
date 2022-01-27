import { useState, useEffect, useContext } from "react"
import ItemsContext from "../context/ItemsContext"
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth } from "firebase/auth"

// Comps
import Form from "../components/Form"
import TodoList from "../components/TodoList"

// Styles
import "./Home.css"
import Spinner from "../components/Spinner"

// Functional Component
export default function Home() {
  const { items, setItems, isLoading, setIsLoading } = useContext(ItemsContext)
  // State
  const [inputText, setInputText] = useState("")
  const [inputQuantity, setInputQuantity] = useState("")
  const [inputCategory, setInputCategory] = useState("")
  const [status, setStatus] = useState("all")
  const [filteredItems, setFilteredItems] = useState([])

  // Auth obj
  const auth = getAuth()

  // fetch items
  useEffect(() => {
    const fetchItems = async () => {
      let ref = collection(db, "list")
      const unsub = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        setItems(results)
        setIsLoading(false)
      })
      return () => unsub()
    }
    fetchItems()
  }, [])

  // Delete Single Item
  const deleteHandler = async (id) => {
    await deleteDoc(doc(db, "list", id))
  }

  // Delete All Completed Items
  const deleteCompletedHandler = async () => {
    const itemsToDelete = items.filter((item) => item.isComplete === true)
    itemsToDelete.forEach((item) => {
      deleteDoc(doc(db, "list", item.id))
    })
  }

  // Set Item as Completed
  const completeHandler = async (id) => {
    const itemCopy = items.find((item) => item.id === id)
    const itemRef = doc(db, "list", id)

    if (itemCopy.isComplete === true) {
      await updateDoc(itemRef, { isComplete: false })
    } else {
      await updateDoc(itemRef, { isComplete: true })
    }
  }

  // Return
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className="homeContainer">
        <h1 className="homeTitle">
          {auth.currentUser && auth.currentUser.displayName + `'s `}
          Shopping List:
        </h1>
        <Form
          inputText={inputText}
          setInputText={setInputText}
          status={status}
          setStatus={setStatus}
          inputQuantity={inputQuantity}
          setInputQuantity={setInputQuantity}
          inputCategory={inputCategory}
          setInputCategory={setInputCategory}
        />
        {isLoading ? (
          <Spinner />
        ) : items && items.length > 0 ? (
          <>
            <TodoList
              filteredItems={filteredItems}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
            />
            <button onClick={deleteCompletedHandler} className="deleteBought">
              Delete All Checked Items
            </button>
          </>
        ) : (
          <h3>Let's add an item!</h3>
        )}
      </div>
    )
  }
}
