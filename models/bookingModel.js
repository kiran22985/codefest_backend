// requiring mongoose to work with database
const mongoose=require("mongoose");

// Model of Course Category
const Booking=new mongoose.Schema({
    bookingId:{
        type:String,
    },
    subcategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory", 
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    booked_date:{
        type:Date
    },
    booked_slot:{
        type:DateTime
    }
})

module.exports=mongoose.model("Booking",Booking);