import React from 'react'
import './normalize.css'
import './homepage.css'
import heroImg from './images/water-treatment-plant.jpg'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function Homepage() {
  return (
    <section className='homepage'>
      <img src={heroImg} alt='water treatment plant' className='home-img' />
      <p className='img-caption'>
        Water is the driving force of all&nbsp;nature
      </p>
      <NavBar navFor='homepage' />
      <Link to='/pipe' className='link-pipe'>
        pipelines current status
      </Link>
    </section>
  )
}

export default Homepage
