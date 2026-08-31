import PropTypes from "prop-types"
import { createContext, useEffect, useState } from "react"

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({})
  useEffect(() => {
    setUsuario({
      name: "Marudsa",
      registered: "15/Agosto/2024",
    })
  }, [])
  return (
    <UserContext.Provider value={usuario}>
      {children}
    </UserContext.Provider>
  )
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserContext, UserContextProvider }