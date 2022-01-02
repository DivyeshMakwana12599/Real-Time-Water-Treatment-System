import React from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { useFetch } from './useFetech'
import NavBar from './NavBar'
import { Chart, registerables } from 'chart.js'
import ScaleLoader from 'react-spinners/ScaleLoader'
import ErrorPage from './ErrorPage'
import './Graph.css'
Chart.register(...registerables)

// https://water-treatment-system-api.herokuapp.com/api/pipe?city=Mumbai&area=vile-parle&pipeID=4

function Graph() {
  let { area, city, pipeID } = useParams()
  const url = `https://project-cors-fix.herokuapp.com/https://water-treatment-system-api.herokuapp.com/api/pipe?city=${city}&area=${area}&pipeID=${pipeID}`
  const { isLoading, data, isError } = useFetch(url)

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className='Graph_loading'
      >
        <ScaleLoader color='black' loading={true} size={150} />
      </div>
    )
  }
  if (isError) {
    return <ErrorPage />
  }

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')
    if (hours === '12') {
      hours = '00'
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12
    }
    return `${hours}:${minutes}`
  }

  let prevDate

  const tempDate = data[0].dateModified.map((date) => {
    let temp = new Date(date)
    if (prevDate !== temp.toDateString()) {
      prevDate = temp.toDateString()
      return temp.toISOString().slice(0, 10)
    } else {
      prevDate = temp.toDateString()
      return convertTime12to24(temp.toLocaleTimeString())
    }
  })
  console.log(tempDate)

  let temperatureData = {
    labels: tempDate,
    datasets: [
      {
        label: 'temperature from the sensor',
        data: data[0].sensorValues.temperature,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        fill: true,
        pointBorderColor: 'rgba(102, 153, 204, 0.4)',
        pointBorderWidth: 10,
        tension: 0.4,
      },
    ],
  }
  let turbidityData = {
    labels: tempDate,
    datasets: [
      {
        label: 'turbidity from the sensor',
        data: data[0].sensorValues.turbidity,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
        fill: true,
        pointBorderColor: 'rgba(102, 153, 204, 0.4)',
        pointBorderWidth: 10,
        tension: 0.4,
      },
    ],
  }
  let phData = {
    labels: tempDate,
    datasets: [
      {
        label: 'ph from the sensor',
        data: data[0].sensorValues.ph,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 3,
        fill: true,
        pointBorderColor: 'rgba(102, 153, 204, 0.4)',
        pointBorderWidth: 10,
        tension: 0.4,
      },
    ],
  }
  let orpData = {
    labels: tempDate,
    datasets: [
      {
        label: 'orp meter value from the sensor',
        data: data[0].sensorValues.orp,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3,
        fill: true,
        pointBorderColor: 'rgba(102, 153, 204, 0.4)',
        pointBorderWidth: 10,
        tension: 0.4,
      },
    ],
  }
  let conductivityData = {
    labels: tempDate,
    datasets: [
      {
        label: 'conductivity from the sensor',
        data: data[0].sensorValues.conductivity,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 3,
        fill: true,
        pointBorderColor: 'rgba(102, 153, 204, 0.4)',
        pointBorderWidth: 10,
        tension: 0.4,
      },
    ],
  }
  return (
    <>
      <NavBar />
      <div className='Graph_graph-container'>
        <div className='Graph_graph-box'>
          <h3 style={{ textAlign: 'center' }}>Temperature Values</h3>
          <Line
            datasetIdKey='id'
            data={temperatureData}
            options={{
              scales: { y: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className='Graph_graph-box'>
          <h3 style={{ textAlign: 'center' }}>Turbidity Values</h3>
          <Line
            datasetIdKey='id'
            data={turbidityData}
            options={{
              scales: { y: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className='Graph_graph-box'>
          <h3 style={{ textAlign: 'center' }}>PH Values</h3>
          <Line
            datasetIdKey='id'
            data={phData}
            options={{
              scales: { y: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className='Graph_graph-box'>
          <h3 style={{ textAlign: 'center' }}>ORP Values</h3>
          <Line
            datasetIdKey='id'
            data={orpData}
            options={{
              scales: { y: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className='Graph_graph-box'>
          <h3 style={{ textAlign: 'center' }}>Conductivity Values</h3>
          <Line
            datasetIdKey='id'
            data={conductivityData}
            options={{
              scales: { y: { beginAtZero: true } },
              maintainAspectRatio: false,
            }}
            height={9}
            width={16}
          />
        </div>
      </div>
    </>
  )
}

export default Graph
