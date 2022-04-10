const express = require("express");
const router = new express.Router();

// importing the Category model
const SubCategory = require("../models/subCategoryModel");

// importing auth to guard the url
const auth = require("../auth/auth");

router.post("/subcategory/add", auth.verifyAdmin, function (req, res) {
  const subcategoryName = req.body.subcategoryName;
  const categoryId=req.body.categoryId;
  const subcategoryDetails=req.body.subcategoryDetails;
  const price=req.body.price;

  const subcategoryData = new SubCategory({
    subcategoryName: subcategoryName,
    categoryId:categoryId,
    subcategoryDetails:subcategoryDetails,
    price:price
  });

  subcategoryData
    .save()
    .then(function () {
      res.status(200).json({ message: "Sub Category Added!!" });
    })
    .catch(function (err) {
      res.status(400).json({ message: err });
    });
});

router.delete("/subcategory/delete/:sid",auth.verifyAdmin,function(req,res){
    const sid=req.params.sid;

    SubCategory.deleteOne({_id:sid}).
    then(function(){
        res.status(200).json({message:"Sub Category Deleted!!!"});
    }).catch(function(err){
        res.status(400).json({message:err});
    });
});

router.put("/subcategory/update/:sid",auth.verifyAdmin,function(req,res){
    const subcategoryName = req.body.subcategoryName;
    const categoryId=req.body.categoryId;
    const subcategoryDetails=req.body.subcategoryDetails;
    const price=req.body.price;

    Category.updateOne(
        {
            _id:req.params.sid
        },
        {
            subcategoryName: subcategoryName,
            categoryId:categoryId,
            subcategoryDetails:subcategoryDetails,
            price:price
        }
    ).
    then(function(){
        res.status(200).json({message:"Sub Category Updated!!!"});
    }).
    catch(function(err){
        res.status(400).json({message:err});
    });
});

module.exports = router;
