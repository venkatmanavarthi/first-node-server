const mongoose = require('mongoose');

async function connectToMongo() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to ", process.env.MONGO_URI)
    }catch {
        console.log("Error conencting to mongodb at", process.env.MONGO_URI)
    }
}

module.exports = connectToMongo