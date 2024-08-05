import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

function App() {

  
  const[criptos, setCriptos] = useState(null)

  useEffect(() => {
    axios.get(`/api/assets`)
    //.then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setCriptos(data.data.data)
    })
    .catch((error) => {
      console.error("la peticion fallo", error)
    })
  }, [])

  if (!criptos) return <p>Cargando...</p>
  

  return (
    <>
      <h1>Lista de Criptomonedas</h1>
      <ol>
        { criptos.map(({id, name,priceUsd}) => (
          <li key={id}>Nombre: {name} Precio: {priceUsd}</li>
        ))
        }
      </ol>    
    </>
  )
}

export default App
