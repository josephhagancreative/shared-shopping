import { useState, useEffect, useContext } from "react"
import { db } from "../firebase.config"

// Firebase import
import { collection, onSnapshot } from "firebase/firestore"

export default function useCollection(c) {
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    let ref = collection(db, c)

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results)
    })

    return () => unsub()
  }, [c])
  return { documents }
}
