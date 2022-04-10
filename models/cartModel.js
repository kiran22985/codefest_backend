// requiring mongoose to work with database
const mongoose=require("mongoose");

// Model of Course Category
const Cart=new mongoose.Schema({
    cartId:{
        type:String,
    },
    subcategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory", 
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    }
})

module.exports=mongoose.model("Cart",Cart);