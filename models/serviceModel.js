// requiring mongoose to work with database
const mongoose=require("mongoose");

// Model of Course Category
const Service=mongoose.model("Service",{
    serviceId:{
        type:String,
    },
    serviceName:{
        type:String,
    }
})

module.exports=Service;