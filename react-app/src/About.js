import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Aos from 'aos'
import 'aos/dist/aos.css'
import './About.css'
import pipeImg from './images/water.jpg'

function About() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return <WelcomeLayout />
}

function WelcomeLayout() {
  return (
    <>
      <NavBar navFor='about' />
      <div className='container'>
        <div className='partition partition-content'>
          <div className='box'>
            <p className='title'>Water Treatment System</p>
            <p className='welcome'>Welcome!</p>
          </div>
          <p className='description'>
            This project tries to solve the problem of impurity in water. We
            have created a water monitoring/treatment API system to cater to it
            and try to solve the problem.
          </p>
          <a href='#main' className='read-more'>
            Read more
          </a>
        </div>
        <div className='partition partition-image'>
          <img className='pipe-image' src={pipeImg} alt='sedimentation tanks' />
        </div>
      </div>
    </>
  )
}

export default About
