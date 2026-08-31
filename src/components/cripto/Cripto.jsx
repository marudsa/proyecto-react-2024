import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import "./Cripto.css"

const Cripto = ({ id, name, priceUSD, symbol, changePercent24Hr }) => {
  return (
    <div className="cripto">
      <Link to={`/criptomonedas/${id}`}>
        <h2>{name}</h2>
      </Link>
      <div className="info">
        <p>
          <span className="label">Precio: </span>
          {parseFloat(priceUSD).toFixed(4)}
        </p>
        <p>
          <span className="label">Código: </span>
          {symbol}
        </p>
        <p>
          <span className="label">Variación 24hrs: </span>
          <span
            className={
              parseFloat(changePercent24Hr) > 0 ? "positivo" : "negativo"
            }
          >
            {parseFloat(changePercent24Hr).toFixed(3)}%
          </span>
        </p>
      </div>
    </div>
  )
}

Cripto.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priceUSD: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  changePercent24Hr: PropTypes.number.isRequired,
}

export default Cripto