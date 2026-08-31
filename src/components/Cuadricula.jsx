import "./Cuadricula.css"
import Cripto from "./cripto/Cripto"
import usePetition from "./hooks/usePetition"

function Cuadricula() {

  const [criptos, cargando, error] = usePetition("assets")

  if (cargando) return <span>Cargando...</span>
  if (error) return <span>No fue posible cargar las criptomonedas.</span>
  if (!criptos) return null

  return (
    <div className="grid-container">
      <h1>Lista de criptomonedas</h1>
      <div className="cripto-container">
        {
          criptos.map(({id, name, priceUsd, symbol, changePercent24Hr}) => (
            <Cripto
              key={id}
              name={name}
              priceUSD={priceUsd}
              symbol={symbol}
              changePercent24Hr={changePercent24Hr}
              id={id}
            />
          )) 
        }
      </div>
    </div>

  )
}

export default Cuadricula