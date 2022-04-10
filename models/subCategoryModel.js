// requiring mongoose to work with database
const mongoose=require("mongoose");

// Model of Course Category
const SubCategory=new mongoose.Schema({
    subcategoryId:{
        type:String,
    },
    subcategoryName:{
        type:String,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category", 
    },
    subcategoryDetails:{
        type:String
    }
})

module.exports=mongoose.model("SubCategory",SubCategory);