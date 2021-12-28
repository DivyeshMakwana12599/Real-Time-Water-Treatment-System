import React, { useState } from 'react'

function checkState({ temperature, orp, ph, turbidity, conductivity }) {
  const FILTERED = [<p style={{ height: '1.3rem' }}>FILTERED</p>, 'item-green']
  const CONTAMINATED = [
    <p style={{ height: '1.3rem' }}>CONTAMINATED</p>,
    'item-red',
  ]

  const obj = (
    <p style={{ height: '6rem' }}>
      Temperature: {temperature[temperature.length - 1] || 'null'}
      <br />
      ORP: {orp[orp.length - 1] || 'null'}
      <br />
      PH: {ph[ph.length - 1] || 'null'}
      <br />
      Turbidity: {turbidity[turbidity.length - 1] || 'null'}
      <br />
      Conductivity: {conductivity[conductivity.length - 1] || 'null'}
    </p>
  )
  FILTERED.push(obj)
  CONTAMINATED.push(obj)
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

function TableItem({ city, area, pipeID, sensorValues, className }) {
  const state = checkState(sensorValues)
  const [data, setData] = useState(state[0])
  const handleClick = (e) => {
    if (
      data.props.children === 'CONTAMINATED' ||
      data.props.children === 'FILTERED'
    ) {
      setData(state[2])
    } else setData(state[0])
  }
  return (
    <tr className={'table-item ' + className}>
      <td className={'item-content item-left ' + className + '-left'}>
        <p>
          City - {city} <br />
          Area - {area} <br />
          pipeID - {pipeID}
        </p>
      </td>
      <td
        className={
          'item-content item-right ' + className + '-right ' + state[1]
        }
        onClick={handleClick}
      >
        {data}
      </td>
    </tr>
  )
}

export default TableItem
