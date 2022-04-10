// requiring mongoose to work with database
const mongoose=require("mongoose");

// Model of Course Category
const Category=new mongoose.Schema({
    categoryId:{
        type:String,
    },
    categoryName:{
        type:String,
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service", 
    }
})

module.exports=mongoose.model("Category",Category);