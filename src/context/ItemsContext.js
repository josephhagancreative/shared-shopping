import { createContext, useState } from "react"

const ItemsContext = createContext()

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([{}])
  const [isLoading, setisLoading] = useState(true)
  return (
    <ItemsContext.Provider value={{ items, setItems, isLoading, setisLoading }}>
      {children}
    </ItemsContext.Provider>
  )
}

export default ItemsContext
