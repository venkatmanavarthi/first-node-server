const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favoriteFoods: {
        type: [String],
        required: false
    }
});

module.exports = mongoose.model('Person', personSchema)
