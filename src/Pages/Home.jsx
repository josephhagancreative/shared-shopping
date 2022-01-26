import { useState, useEffect, useContext } from "react"
// import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import ItemsContext from "../context/ItemsContext"
import {
  doc,
  query,
  updateDoc,
  getDocs,
  collection,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"
// import useCollection from "../hooks/useCollection"

// Comps
import Form from "../components/Form"
import TodoList from "../components/TodoList"

// Styles
import "./Home.css"

export default function Home() {
  const [itemToEdit, setItemToEdit] = useState(null)
  // const { documents } = useCollection("list")
  // Context
  const { items, setItems, isLoading, setisLoading } = useContext(ItemsContext)
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
    fetchItems()
  }, [])

  const fetchItems = async () => {
    // try {

    let ref = collection(db, "list")

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setItems(results)
      setisLoading(false)
    })

    return () => unsub()

    // const itemsRef = collection(db, "list")
    // const q = query(itemsRef)
    // const querySnap = await getDocs(q)

    // const list = []

    // querySnap.forEach((doc) => {
    //   list.push({ ...doc.data(), id: doc.id })
    // })
    // setItems(list)
    // setisLoading(false)
  }
  // catch (error) {
  //   console.log(error)
  //   setisLoading(false)
  // }
  // }

  // Delete Item
  const deleteHandler = async (id) => {
    await deleteDoc(doc(db, "list", id))
    fetchItems()
  }

  // Delete Completed Items
  const deleteCompletedHandler = async () => {
    const itemsToDelete = items.filter((item) => item.isComplete === true)
    itemsToDelete.forEach((item) => {
      deleteDoc(doc(db, "list", item.id))
      fetchItems()
    })
  }

  // Complete
  const completeHandler = async (id) => {
    const itemCopy = items.find((item) => item.id === id)
    const itemRef = doc(db, "list", id)

    if (itemCopy.isComplete === true) {
      await updateDoc(itemRef, { isComplete: false })
      fetchItems()
    } else {
      await updateDoc(itemRef, { isComplete: true })
      fetchItems()
    }
  }

  if (isLoading) {
    return <h3>Loading...</h3>
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
          fetchItems={fetchItems}
        />
        {isLoading ? (
          <h3>Loading...</h3>
        ) : items && items.length > 0 ? (
          <>
            <TodoList
              filteredItems={filteredItems}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
            />
            <button onClick={deleteCompletedHandler} className="deleteBought">
              Delete All Bought Items
            </button>
          </>
        ) : (
          <h3>Let's add an item!</h3>
        )}
      </div>
    )
  }
}
