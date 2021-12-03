const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");

router.use(express.json());

const pipeDataSchema = new mongoose.Schema({
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
      type: Number,
      required: false,
      default: null,
    },
    temperature: {
      type: Number,
      required: true,
    },
    orp: {
      type: Number,
      required: false,
      default: null,
    },
    turbidity: {
      type: Number,
      required: false,
      default: null,
    },
    conductivity: {
      type: Number,
      required: false,
      default: null,
    },
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

pipeData = mongoose.model("pipeData", pipeDataSchema);

router.get("/", async function (req, res) {
  let data;

  if (req.query.city) {
    if (req.query.area) {
      if (req.query.pipeId) {
        data = await pipeData.find({
          city: req.query.city,
          area: req.query.area,
          pipeID: req.query.pipeId,
        });
      } else
        data = await pipeData.find({
          city: req.query.city,
          area: req.query.area,
        });
    } else data = await pipeData.find({ city: req.query.city });
  } else data = await pipeData.find();

  if (data.length === 0) return res.status(404).send("data not found :(");

  res.send(data);
});

function validate(data) {
  const schema = Joi.object({
    city: Joi.string().min(3).max(12).required(),
    area: Joi.string().min(3).max(12).required(),
    pipeID: Joi.number().integer().min(0),
    sensorValues: Joi.object({
      ph: Joi.number().min(0).max(14),
      temperature: Joi.number().required(),
      orp: Joi.number().min(-1500).max(1500),
      turbidity: Joi.number().min(0).max(1000),
      conductivity: Joi.number().min(0).max(1000),
    }),
    dateModified: Joi.date(),
  });
  return Joi.validate(data, schema);
}

module.exports = router;

// async function creatingData() {
//   let data = new pipeData({
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
//   const data = await pipeData
//     .find({ city: "Rajkot" })
//     .select({ city: 1, area: 1, sensorValues: 1 });
//   console.log(data);
// }
