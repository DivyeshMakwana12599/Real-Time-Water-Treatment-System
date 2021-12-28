import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [url])

  useEffect(() => {
    getData()
  }, [url, getData])
  return { loading, data }
}
