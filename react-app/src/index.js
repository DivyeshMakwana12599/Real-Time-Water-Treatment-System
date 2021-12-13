import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
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
    <section className='table'>
      <TableHeader />
      {data.map((item, index) => {
        // console.log(item)
        if (index === data.length - 1) item.className = 'last-item'
        return <TableItem {...item} key={item._id} />
      })}
      <Loading isLoading={isLoading} />
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
    </section>
  )
}

function Loading({ isLoading }) {
  // console.log(isLoading)
  if (isLoading) {
    return (
      <>
        <div className='loading'>Loading...</div>
      </>
    )
  }
  return <></>
}
function checkState({ temperature, orp, ph, turbidity, conductivity }) {
  const FILTERED = ['FILTERED', 'item-green']
  const CONTAMINATED = ['CONTAMINATED', 'item-red']
  if (
    temperature[temperature.length - 1] !== null &&
    (temperature[temperature.length - 1] < 30 ||
      temperature[temperature.length - 1] > 40)
  )
    return CONTAMINATED
  else if (
    ph[ph.length - 1] !== null &&
    (ph[ph.length - 1] < 6 || ph[ph.length - 1] > 7)
  )
    return CONTAMINATED
  else if (
    orp[orp.length - 1] !== null &&
    (orp[orp.length - 1] < 80 || orp[orp.length - 1] > 100)
  )
    return CONTAMINATED
  else if (
    turbidity[turbidity.length - 1] !== null &&
    (turbidity[turbidity.length - 1] < 0.14 ||
      turbidity[turbidity.length - 1] > 0.2)
  )
    return CONTAMINATED
  else if (
    conductivity[conductivity.length - 1] !== null &&
    (conductivity[conductivity.length - 1] < 200 ||
      conductivity[conductivity.length - 1] > 260)
  )
    return CONTAMINATED
  else return FILTERED
}
function TableItem(props) {
  const { city, area, pipeID, sensorValues, className } = props
  const state = checkState(sensorValues)
  // console.log(props)
  return (
    <div className={'table-item ' + className}>
      <div className={'item-content item-left ' + className + '-left'}>
        <p>{city + ', ' + area + ', pipeID= ' + pipeID}</p>
      </div>
      <div
        className={
          'item-content item-right ' + className + '-right ' + state[1]
        }
      >
        <p>{state[0]}</p>
        {/* <img src={state[2]} alt='water not contaminated' /> */}
      </div>
    </div>
  )
}

function TableHeader() {
  return (
    <div className='table-header'>
      <div className='header-content header-left'>
        <p>Pipe</p>
      </div>
      <div className='header-content header-right'>
        <p>State</p>
      </div>
    </div>
  )
}

ReactDOM.render(<DataTable />, document.getElementById('root'))
