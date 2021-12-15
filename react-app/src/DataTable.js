import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import TableHeader from './TableHeader'
import TableItem from './TableItem'

const url =
  'https://project-cors-fix.herokuapp.com/https://water-treatment-system-api.herokuapp.com'

function DataTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {data.map((item, index) => {
            // console.log(item)
            if (index === data.length - 1) item.className = 'last-item'
            return <TableItem {...item} key={item._id} />
          })}
          <Loading isLoading={isLoading} />
        </tbody>
        <tr>
          <td colSpan='2'>
            <button
              type='button'
              onClick={() => {
                setData([])
                setIsLoading(true)
                getData()
              }}
              className='table-btn'
            >
              Refresh
            </button>
          </td>
        </tr>
      </table>
    </>
  )
}

export default DataTable
