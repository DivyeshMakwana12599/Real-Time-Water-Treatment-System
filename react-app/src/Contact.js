import React, { useState } from 'react'
import NavBar from './NavBar'
import './Contact.css'

const phoneNumbers = [
  { day: 'monday', time: '9:00 to 5:00' },
  { day: 'tuesday', time: '9:00 to 5:00' },
  { day: 'wednesday', time: '9:00 to 5:00' },
  { day: 'thursday', time: '9:00 to 5:00' },
  { day: 'friday', time: '9:00 to 5:00' },
  { day: 'saturday', time: '12:00 to 5:00' },
]

function Contact() {
  return (
    <>
      <NavBar navFor='contact' />
      <ContactPageForm />
    </>
  )
}

function ContactPageForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && number && email && message) {
      const query = {
        name,
        number,
        email,
        message,
        id: new Date().getTime().toString(),
      }
      console.log(query)
      setEmail('')
      setMessage('')
      setNumber('')
      setName('')
    } else {
      console.log('empty values')
    }
  }

  return (
    <>
      <div className='About_container'>
        <div className='About_partition-left'>
          <div className='About_address-grid'>
            <h2 className='About_address'>come for a visit</h2>
            <p className='About_address'>
              203/204 shiv co-op hou. soc. , new gidc umbergaon, valsad,
              gujarat, india-396171
            </p>
          </div>
          {phoneNumbers.map((day) => {
            return (
              <div className='About_time-component'>
                <h3 className='About_day'>{day.day} </h3>
                <p className='About_time'>{day.time} </p>
              </div>
            )
          })}
        </div>
        <div className='About_partition-right'>
          <div className='About_contact'>
            <h2>GET IN TOUCH</h2>
            <p>7622012599</p>
            <p>divyeshmakwana12599@gmail.com</p>
          </div>
          <form onSubmit={handleSubmit} className='About_form'>
            <div className='About_form-item'>
              <label htmlFor='name'>NAME: </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='About_input'
                placeholder='Your name...'
              />
            </div>
            <div className='About_form-item'>
              <label htmlFor='email'>EMAIL: </label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='About_input'
                placeholder='Your email...'
              />
            </div>
            <div className='About_form-item'>
              <label htmlFor='number'>NUMBER: </label>
              <input
                type='text'
                id='number'
                name='number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className='About_input'
                placeholder='Your mobile number...'
              />
            </div>
            <div className='About_form-item'>
              <label htmlFor='message'>MESSAGE: </label>
              <textarea
                type='text'
                id='message'
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='About_message About_input'
                placeholder='Enter you message to send...'
              />
              <button type='submit' className='About_submit-btn'>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Contact
