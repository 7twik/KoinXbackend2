const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    symbol:{
        type:String
    },
    currentPrice:{
        type:Number,
    },
    marketCap:{
        type:Number,
    },
    change24h:{
        type:Number,
    },
    time:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("crypto", cryptoSchema);