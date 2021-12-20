import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

const style = {
  homepage: {
    position: 'absolute',
    top: '0',
    background: 'transparent',
  },
  active: 'active',
}

function NavBar({ navFor }) {
  return (
    <div
      className='nav-bar'
      style={navFor === 'homepage' ? style.homepage : {}}
    >
      <Link to='/' className='logo'>
        <img src={logo} alt='logo of the company' />
      </Link>
      <span className='home-nav'>
        <Link
          to='/process'
          className={navFor === 'process' ? 'nav-item active' : 'nav-item'}
        >
          process
        </Link>
        <Link
          to='/about'
          className={navFor === 'about' ? 'nav-item active' : 'nav-item'}
        >
          about
        </Link>
        <Link
          to='/contact'
          className={navFor === 'contact' ? 'nav-item active' : 'nav-item'}
        >
          contact us
        </Link>
      </span>
    </div>
  )
}

export default NavBar
