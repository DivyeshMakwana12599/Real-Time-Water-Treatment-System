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
  return (
    <>
      <NavBar navFor='about' />
      <div className='container'>
        <div className='partition partition-content'>
          <div className='box'>
            <p className='title'>Water Treatmetn System</p>
            <p className='welcome'>Welcome!</p>
          </div>
          <p className='description'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            molestiae suscipit officia. Voluptatum temporibus, numquam officiis
            deserunt consequatur tempora iste!
          </p>
          <a href='#main' className='read-more'>
            Read more
          </a>
        </div>
        <div className='partition partition-image'>
          <img
            className='pipe-image'
            src={pipeImg}
            alt='image of pipe with a liver'
          />
        </div>
      </div>
    </>
  )
}

export default About
