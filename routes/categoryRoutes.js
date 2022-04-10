const express = require("express");
const router = new express.Router();

// importing the Category model
const Category = require("../models/categoryModel");

// importing auth to guard the url
const auth = require("../auth/auth");

// Route to add category
router.post("/category/add", auth.verifyAdmin, function (req, res) {
  const categoryName = req.body.categoryName;
  const serviceId=req.body.serviceId;

  const categoryData = new Category({
    categoryName: categoryName,
    serviceId:serviceId
  });

  categoryData
    .save()
    .then(function () {
      res.status(200).json({ message: "Category Added!!" });
    })
    .catch(function (err) {
      res.status(400).json({ message: err });
    });
});

// Route to delete category
router.delete("/category/delete/:catid",auth.verifyAdmin,function(req,res){
    const catid=req.params.catid;

    Category.deleteOne({_id:catid}).
    then(function(){
        res.status(200).json({message:"Category Deleted!!!"});
    }).catch(function(err){
        res.status(400).json({message:err});
    });
});

// Route to update category
router.put("/category/update/:catid",auth.verifyAdmin,function(req,res){
    const categoryName=req.body.categoryName;
    const serviceId=req.body.serviceId;

    Category.updateOne(
        {
            _id:req.params.catid
        },
        {
            categoryName:categoryName,
            serviceId:serviceId
        }
    ).
    then(function(){
        res.status(200).json({message:"Category Updated!!!"});
    }).
    catch(function(err){
        res.status(400).json({message:err});
    });
});

module.exports = router;
