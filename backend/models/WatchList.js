const mongoose = require('mongoose')
const { Schema } = mongoose;

const WatchListSchema = new Schema({
    symbol:String,
    price:Number,
    type:String,
    index:Number
})

module.exports = mongoose.model('WatchList',WatchListSchema)