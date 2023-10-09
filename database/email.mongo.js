const mongoose = require('mongoose')

const schema = new mongoose.schema({
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