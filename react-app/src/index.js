import ReactDOM from 'react-dom'
import './index.css'
import check from './images/thumb.png'
import cross from './images/x-mark-xxl.png'

const data = [
  {
    city: 'Umbergaon',
    area: 'New GIDC',
    pipeID: 1,
    sensorValues: {
      temperature: 30,
    },
  },
  {
    city: 'Rajkot',
    area: 'SorathiaWadi',
    pipeID: 0,
    sensorValues: {
      temperature: 35,
    },
  },
  {
    city: 'Vapi',
    area: 'Char Rasta',
    pipeID: 3,
    sensorValues: {
      temperature: 31,
    },
  },
]

function DataTable() {
  return (
    <section className='table'>
      <TableHeader />
      {data.map((item, index) => {
        console.log(item, index)
        if (index === data.length - 1) item.className = 'last-item'
        return <TableItem {...item} key={item.pipeID} />
      })}
    </section>
  )
}
function checkState({ temperature }) {
  const FILTERED = ['FILTERED', 'item-green', check]
  const CONTAMINATED = ['CONTAMINATED', 'item-red', cross]
  if (temperature === 30) return FILTERED
  else return CONTAMINATED
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
