const mongoose= require("mongoose");

const Professional=mongoose.model('Professional',{
    username:{
        type:String
    },
    password: {
        type:String
    },
    profession:{
        type:String
    },
    contact:{
        type:Number
    },
    email:{
        type:String
    },
    address:{
        type:String
    }
})

module.exports=Professional;