const express = require('express')
const Joi = require('joi')
const router = express.Router()
const mongoose = require('mongoose')

router.use(express.json())

const PipeDataSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },

  pipeID: {
    type: Number,
    required: true,
  },

  sensorValues: {
    ph: {
      type: [Number],
      required: false,
    },
    temperature: {
      type: [Number],
      required: true,
    },
    orp: {
      type: [Number],
      required: false,
    },
    turbidity: {
      type: [Number],
      required: false,
    },
    conductivity: {
      type: [Number],
      required: false,
    },
  },
  dateModified: {
    type: [Date],
  },
})

PipeData = mongoose.model('PipeData', PipeDataSchema)

router.get('/', async function (req, res) {
  let data

  if (req.query.city) {
    if (req.query.area) {
      if (req.query.pipeID) {
        data = await PipeData.find({
          city: req.query.city,
          area: req.query.area,
          pipeID: req.query.pipeID,
        })
      } else
        data = await PipeData.find({
          city: req.query.city,
          area: req.query.area,
        })
    } else data = await PipeData.find({ city: req.query.city })
  } else data = await PipeData.find()

  if (data.length === 0) return res.status(404).send('data not found :(')

  res.send(data)
})

router.post('/', async function (req, res) {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  req.body = formatData(req.body)
  const data = await PipeData.find({
    city: req.body.city,
    area: req.body.area,
    pipeID: req.body.pipeID,
  })

  if (data.length != 0) {
    res.status(400).send('BAD REQUEST')
  } else {
    req.body = formatDataForPost(req.body)
    const result = await new PipeData(req.body).save()
    res.status(200).send('done')
  }
})

router.put('/', async function (req, res) {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const data = await PipeData.find({
    city: req.body.city,
    area: req.body.area,
    pipeID: req.body.pipeID,
  })
  if (data.length === 0) res.status(404).send('NOT FOUND')
  else {
    req.body = formatDataForPut(data[0], req.body)
    await PipeData.findByIdAndUpdate(data[0]._id, req.body)
    res.status(200).send('done')
  }
})

router.delete('/', async function (req, res) {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  let data = await PipeData.find({
    city: req.body.city,
    area: req.body.area,
    pipeID: req.body.pipeID,
  })
  if (data.length === 0) res.status(400).send('BAD REQUEST')
  else {
    await PipeData.findByIdAndRemove(data[0]._id, req.body)
    res.status(200).send('done')
  }
})

function formatData(data) {
  if (data.sensorValues.temperature === undefined) {
    data.sensorValues.temperature = null
  }
  if (data.sensorValues.ph === undefined) {
    data.sensorValues.ph = null
  }
  if (data.sensorValues.orp === undefined) {
    data.sensorValues.orp = null
  }
  if (data.sensorValues.turbidity === undefined) {
    data.sensorValues.turbidity = null
  }
  if (data.sensorValues.conductivity === undefined) {
    data.sensorValues.conductivity = null
  }
  return data
}

function formatDataForPost(data) {
  formatData(data)
  data.sensorValues.temperature = [data.sensorValues.temperature]
  data.sensorValues.ph = [data.sensorValues.ph]
  data.sensorValues.orp = [data.sensorValues.orp]
  data.sensorValues.turbidity = [data.sensorValues.turbidity]
  data.sensorValues.conductivity = [data.sensorValues.conductivity]
  data.dateModified = [Date.now()]
  return data
}

function formatDataForPut(prevData, data) {
  formatData(data)
  prevData.sensorValues.temperature.push(data.sensorValues.temperature)
  prevData.sensorValues.ph.push(data.sensorValues.ph)
  prevData.sensorValues.orp.push(data.sensorValues.orp)
  prevData.sensorValues.conductivity.push(data.sensorValues.conductivity)
  prevData.sensorValues.turbidity.push(data.sensorValues.turbidity)
  prevData.dateModified.push(new Date())
  return prevData
}

function validate(data) {
  const schema = Joi.object({
    city: Joi.string().min(3).max(30).required(),
    area: Joi.string().min(3).max(30).required(),
    pipeID: Joi.number().integer().min(0).required(),
    sensorValues: Joi.object({
      ph: Joi.number().min(0).max(14),
      temperature: Joi.number().required(),
      orp: Joi.number().min(-1500).max(1500),
      turbidity: Joi.number().min(0).max(1000),
      conductivity: Joi.number().min(0).max(1000),
    }),
    dateModified: Joi.date(),
  })

  return schema.validate(data)
}

module.exports = router

// async function creatingData() {
//   let data = new PipeData({
//     city: "Umbergaon",
//     area: "NEW GIDC Colony",
//     pipeID: 0,
//     sensorValues: {
//       temperature: 30.5,
//     },
//   });

//   data = await data.save();
// }

// async function findingData() {
//   const data = await PipeData
//     .find({ city: "Rajkot" })
//     .select({ city: 1, area: 1, sensorValues: 1 });
//   console.log(data);
// }
