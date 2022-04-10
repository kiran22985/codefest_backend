const express = require("express");
const router = new express.Router();


const Service = require("../models/serviceModel");


const auth = require("../auth/auth");


router.post("/service/add", auth.verifyAdmin, function (req, res) {
  const serviceName = req.body.serviceName;

  const serviceData = new Service({
    serviceName: serviceName,
  });

  serviceData
    .save()
    .then(function () {
      res.status(200).json({ message: "Service Added!!" });
    })
    .catch(function (err) {
      res.status(400).json({ message: err });
    });
});


router.delete("/service/delete/:sid",auth.verifyAdmin,function(req,res){
    const sid=req.params.sid;

    Service.deleteOne({_id:sid}).
    then(function(){
        res.status(200).json({message:"Service Deleted!!!"});
    }).catch(function(err){
        res.status(400).json({message:err});
    });
});


router.put("/service/update/:sid",auth.verifyAdmin,function(req,res){
    const serviceName=req.body.serviceName;

    Service.updateOne(
        {
            _id:req.params.sid
        },
        {
            serviceName:serviceName
        }
    ).
    then(function(){
        res.status(200).json({message:"Service Updated!!!"});
    }).
    catch(function(err){
        res.status(400).json({message:err});
    });
});

module.exports = router;
