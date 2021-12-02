const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/pipe-data')
    .then(() => console.log("Connected to server..."))
    .catch(err => console.error("Error connecting to server...", err));


const pipeDataSchema = new mongoose.Schema({
    city: {
        type: String, 
        required: true
    },
    area: {
        type: String, 
        required: true
    },

    pipeID: {
        type: Number, 
        required: true
    },
        
    sensorValues: {
        ph: {
            type: Number,
            required: false,
            default: null
        },
        temperature: {
            type: Number,
            required: true
        },
        orp: {
            type: Number,
            required: false,
            default: null
        },
        turbidity: {
            type: Number,
            required: false,
            default: null
        },
        conductivity: {
            type: Number,
            required: false,
            default: null
        }
    },
    dateModified: {
        type: Date, 
        default: Date.now
    }
});

pipeData = mongoose.model("pipeData", pipeDataSchema);

async function creatingData(){
    let data = new pipeData({
        city: 'Umbergaon',
        area: 'NEW GIDC Colony',
        pipeID: 0,
        sensorValues: {
            temperature: 30.5
        }
    });
    
    data = await data.save();
}

async function findingData(){
    const data = await pipeData
        .find({city: "Rajkot"})
        .select({city:1, area:1, sensorValues:1});
    console.log(data);
}
