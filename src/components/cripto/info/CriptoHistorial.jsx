import PropTypes from "prop-types"
import { parseFloatNumber } from "../../helpers/numbers"

const CriptoHistory = ({ history }) => {
  return (
    <div className="history">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ date, priceUsd, time }) => (
            <tr key={time}>
              <td className="label">{new Date(date).toDateString()}</td>
              <td className="price">{parseFloatNumber(priceUsd, 3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

CriptoHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      priceUsd: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CriptoHistory