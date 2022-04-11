const jwt= require("jsonwebtoken");
const Customer= require("../models/customerModel");
const Admin= require("../models/adminModel");


module.exports.
verifyCustomer= function(req,res,next){
  try{
    const token= req.headers.authorization.split(" ")[1];
    const data= jwt.verify(token, "mysecretkey");
    // console.log(data.CustomerId);
    Customer.findOne({_id: data.customerId})
    .then(function(result){
        //save the details of logged in customer info
        req.customerInfo=result;
        next();
        // console.log(result)
    })
    .catch(function(){
        res.send({msg:"invalid token"})
    })

  }
  catch(e){
      res.send({msg:"invalid token"})
}
}


module.exports.verifyAdmin= function(req,res,next){
    try{
        console.log("config ", req.headers)
      const token= req.headers.authorization.split(" ")[1];
      const data= jwt.verify(token, "mysecretkey");
      console.log(data.adminId);
      Admin.findOne({_id: data.adminId})
      .then(function(result){
          req.adminInfo=result;
          next();
          console.log(result)
      })
      .catch(function(){
          res.send({msg:"invalid token"})
      })
  
    }
    catch(e){
        res.send({msg:"invalid token"})
  }
  }

  module.exports.verifyProfessional= function(req,res,next){
    try{
        console.log("config ", req.headers)
      const token= req.headers.authorization.split(" ")[1];
      const data= jwt.verify(token, "mysecretkey");
      console.log(data.adminId);
      Professional.findOne({_id: data.professionalId})
      .then(function(result){
          req.professionalInfo=result;
          next();
          console.log(result)
      })
      .catch(function(){
          res.send({msg:"invalid token"})
      })
  
    }
    catch(e){
        res.send({msg:"invalid token"})
  }
  }

  
