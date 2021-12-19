import React from 'react'
import './normalize.css'
import './homepage.css'
import logo from './images/logo.png'
import heroImg from './images/water-treatment-plant.jpg'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <section className='homepage'>
      <img src={heroImg} alt='water treatment plant' className='home-img' />
      <p className='img-caption'>
        Water is the driving force of all&nbsp;nature
      </p>
      <Link to='/' className='logo'>
        <img src={logo} alt='logo of the company' />
      </Link>
      <span className='home-nav'>
        <Link to='/'>process</Link>
        <Link to='/'>about</Link>
        <Link to='/'>contact us</Link>
      </span>

      <Link to='/pipe' className='link-pipe'>
        pipelines current status
      </Link>
    </section>
  )
}

export default Homepage
