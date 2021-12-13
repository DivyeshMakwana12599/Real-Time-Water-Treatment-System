const express = require('express')
const mongoose = require('mongoose')
const homepage = require('./routes/homepage')
const pipe = require('./routes/pipe')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use('/', homepage)
app.use('/api/pipe', pipe)
app.use(
  cors({
    origin: 'https://water-treatment-system.netlify.app',
  })
)
const port = process.env.PORT || 3001

mongoose
  .connect(
    'mongodb+srv://d1vyesh:divyesh12599@pipe.gxndf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to mongodb...'))
  .catch((err) => console.error('Error connecting to server...', err))

app.listen(port, () => console.log(`listening on PORT: ${port}...`))
