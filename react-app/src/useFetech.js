import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        const responce = await fetch(url)
        if (responce.status >= 200 && responce.status <= 299) {
          const result = await responce.json()
          setData(result)
          setIsLoading(false)
        } else {
          setIsError(true)
          setIsLoading(false)
          throw new Error(responce.statusText)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getData()
    const interval = setInterval(() => getData(), 10000)
    // getData()
    return () => clearInterval(interval)
  }, [url])

  return { isLoading, data, isError }
}
