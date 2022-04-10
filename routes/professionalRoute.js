const express = require("express");
const router = new express.Router();
const Professional = require("../models/professionalModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")


// register route for admin
router.post("/professional/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const profession= req.body.profession;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;



    Professional.findOne(
            { username: username }
    )
        .then(function (ProfessionData) {
            if (ProfessionData != null) {
                res.status(401).json({ msg: "Username Already Exists. Try some other name" })
            }
            else {
                bcryptjs.hash(password, 10, function (e, hashed_password) {
                    const professionData = new Professional({
                        username: username,
                        password: hashed_password,
                        profession: profession,
                        email: email,
                        contact: contact,
                        address: address

                     
                    })
                    professionData.save()
                        .then(function(){
                            res.json({msg: "User Registered!"})
                        })
                        .catch(function(error){
                            res.json(error);
                        });
                })
            }
        })
})
    // login route for admin
router.post('/professional/login', function(req,res){
    const username= req.body.username; 
    console.log(req.body)
    Professional.findOne({username:username})
     .then(function(ProfessionalData){
        if (ProfessionalData===null){
            return res.json({msg: " Professional invalid login credentials"})
        }
         /// now if username is valid
        const password= req.body.password;  // postman le patahyeko pw
        //  console.log(password);
        bcryptjs.compare(password,ProfessionalData.password, function(err,result){ // 1st client le pathayeko(postman) 2nd database ma bhayeko 
            if(result===false){
                return res.json({msg:"Invalid Professional Credentials!"})
            }
            /// correct condition generating token
            const token12= jwt.sign({professionalId:ProfessionalData._id},"mysecretkey");  //jwt.sign bhaneko toke banaideu
            
            res.json({token:token12, msg:" Admin Auth Success"})

        })
     })
     .catch(function(e){
         res.json({"msg":"Some error occured"})
     }) 
})





module.exports = router;