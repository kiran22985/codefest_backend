const mongoose= require("mongoose");

const Customer=mongoose.model('Customer',{
    username:{
        type:String
    },
    password: {
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    image:{
        type:String
    },
})

module.exports=Customer;