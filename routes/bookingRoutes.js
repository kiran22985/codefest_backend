const express=require("express");
const router = new express.Router();

// acquiring Bookmark Model
const Booking=require("../models/bookingModel");

// importing auth to guard the url
const auth=require("../auth/auth");

router.post("/book/post",auth.verifyCustomer,function(req,res){
    const customerId=req.customerInfo._id;
    const subcategoryId=req.body.subcategoryId;
    const booked_date=req.body.booked_date;
    const booked_slot=req.body.booked_slot;

    const bookingData=new Booking({
        customerId:customerId,
        subcategoryId:subcategoryId,
        booked_date:booked_date,
        bookeed_slot:booked_slot
    });

    bookingData.
    save().
    then(function(){
        res.status(200).json({success:true,message:"Booked"});
    }).
    catch(function(err){
        res.status(400).json({success:false,message:err});
    });
});

// Router to get booked application
router.get("/booking/view",auth.verifyAdmin,function(req,res){
    Booking.find({customerId:req.customerInfo._id}).
    populate('customerId').
    populate('subcategoryId').
    then(function(data){
        res.json(data);
    }).
    catch(function(err){
        res.status(400).json({message:err});
    })
});

// Route to view their bookings
router.get("/booking/viewmybooking",auth.verifyCustomer,function(req,res){
    Booking.find({customerId:req.customerInfo._id}).
    populate('customerId').
    populate('subcategoryId').
    then(function(data){
        res.status(200).json(data);
    }).
    catch(function(err){
        res.status(400).json({message:err});
    })
});

router.delete("/booking/delete/:bid",auth.verifyCustomer,function(req,res){
    const customerId=req.customerInfo._id;
    const bid=req.params.bid;

    console.log(customerId,bid);

    Booking.deleteOne({_id:bid,customerId:customerId}).
    then(function(){
        res.status(200).json({success:true,message:"Booking deleted!!!"})
    }).
    catch(function(err){
        res.status(400).json({success:false,message:err});
    });
});


module.exports=router;