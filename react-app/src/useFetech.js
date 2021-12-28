import { useState, useEffect, useCallback } from 'react'

export const useFetch = (url) => {
  async function getData() {
    try {
      const responce = await fetch(url + '/api/pipe')
      const result = await responce.json()
      setData(result)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData()
    const interval = setInterval(() => getData(), 10000)
    // getData()
    return () => clearInterval(interval)
  }, [url])

  return { isLoading, data }
}
