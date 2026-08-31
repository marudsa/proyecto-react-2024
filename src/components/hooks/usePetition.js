import axios from "axios"
import { useEffect, useState } from "react"

const normalizeTicker = (ticker) => ({
  id: ticker.id,
  name: ticker.name,
  symbol: ticker.symbol,
  rank: ticker.rank,
  priceUsd: ticker.quotes?.USD?.price ?? 0,
  maxSupply: ticker.max_supply ?? 0,
  marketCapUsd: ticker.quotes?.USD?.market_cap ?? 0,
  volumeUsd24Hr: ticker.quotes?.USD?.volume_24h ?? 0,
  changePercent24Hr: ticker.quotes?.USD?.percent_change_24h ?? 0
})

const normalizeHistory = (history) =>
  history.map((item) => ({
    date: item.timestamp,
    time: item.timestamp,
    priceUsd: item.price
  }))

const getHistoryStartDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 30)

  return date.toISOString().split("T")[0]
}

const buildRequest = (apiUrl, endpoint) => {
  if (endpoint === "assets") {
    return {
      url: `${apiUrl}tickers?quotes=USD`,
      transform: (data) => data.slice(0, 100).map(normalizeTicker)
    }
  }

  const historyMatch = endpoint.match(
    /^assets\/([^/]+)\/history/
  )

  if (historyMatch) {
    const coinId = historyMatch[1]
    const start = getHistoryStartDate()

    return {
      url: `${apiUrl}tickers/${coinId}/historical?start=${start}&interval=1d`,
      transform: normalizeHistory
    }
  }

  const tickerMatch = endpoint.match(/^assets\/([^/]+)$/)

  if (tickerMatch) {
    const coinId = tickerMatch[1]

    return {
      url: `${apiUrl}tickers/${coinId}?quotes=USD`,
      transform: normalizeTicker
    }
  }

  return {
    url: `${apiUrl}${endpoint}`,
    transform: (data) => data
  }
}

const usePetition = (endpoint) => {
  const API_URL = import.meta.env.VITE_API_URL

  const [data, setData] = useState()
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const request = buildRequest(API_URL, endpoint)

    setCargando(true)
    setError(null)

    axios
      .get(request.url)
      .then((response) => {
        setData(request.transform(response.data))
        setCargando(false)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        setCargando(false)
      })
  }, [API_URL, endpoint])

  return [data, cargando, error]
}

export default usePetition