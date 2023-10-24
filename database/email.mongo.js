const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id : {
        type: Number ,
        required: true
    },
    email :{
        type : String ,
        required : true
    }
})

module.exports = mongoose.model( 'Email' , schema )