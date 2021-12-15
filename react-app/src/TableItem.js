import React from 'react'

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

function TableItem({ city, area, pipeID, sensorValues, className }) {
  const state = checkState(sensorValues)
  return (
    <tr className={'table-item ' + className}>
      <td className={'item-content item-left ' + className + '-left'}>
        <p>{city + ', ' + area + ', pipeID= ' + pipeID}</p>
      </td>
      <td
        className={
          'item-content item-right ' + className + '-right ' + state[1]
        }
      >
        <p>{state[0]}</p>
      </td>
    </tr>
  )
}

export default TableItem
