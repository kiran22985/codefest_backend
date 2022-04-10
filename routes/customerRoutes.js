const express = require("express");
const router = new express.Router();
const bcryptjs = require("bcryptjs"); // helps bcryt the pw
const jwt = require("jsonwebtoken")    //helps to create token
const Customer = require("../models/customerModel");
const auth = require("../auth/auth");
const upload = require("../file/file");




//customer registration 
router.post("/customer/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    Customer.findOne({
        $or:
            [{ username: username }, { email: email }]
    })
        .then(function (CustomerData) {
            if (CustomerData != null) {
                res.status(401).json({ msg: "Username Already Exists. Try some other name" })
            }
            else {
                bcryptjs.hash(password, 10, function (e, hashed_password) {
                    const customerData = new Customer({
                        username: username,
                        password: hashed_password,
                        email: email,
                        phone: phone,
                        address: address
                    })
                    customerData.save()
                        .then(function () {
                            res.json({ message: "User Registered!", status: 1, success: true })
                        })
                        .catch(function (e) {
                            res.json(e);
                        });
                })
            }
        })
})



// login route for customer
router.post('/customer/login', function (req, res) {
    const username = req.body.username; //client le pathayeko
    Customer.findOne({ username: username })//agadi ko model sanga pachadi ko customer
        .then(function (CustomertData) {
            if (CustomerData === null) {
                return res.json({ msg: "Invalid login credentials" })
            }
            /// now if username is valid
            const password = req.body.password;  // postman le patahyeko pw
            //  console.log(password);
            bcryptjs.compare(password, CustomerData.password, function (err, result) { // 1st customer le pathayeko(postman) 2nd database ma bhayeko 
                if (result === false) {
                    return res.json({ msg: "Invalid Credentials!" })
                }
                /// correct condition generating token
                const token12 = jwt.sign({ customerId: CustomerData._id }, "mysecretkey");  //jwt.sign bhaneko toke banaideu

                res.json({ token: token12, msg: "Auth Success", success: true })

            })
        })
        .catch(function (e) {
            res.json(e)
        })
})




//for uploading image use this route
router.post("/customer/profile", upload.single('user_image'), function (req, res) {  //user_image postman sanga milcha
    console.log(req.file);
    if (req.file === undefined) {
        return res.json({
            msg: "Invalid file format"
        })
    }
    else {
        res.send(`/${req.file.filename}`)
    }
})





//for customer to view profile after logging in
router.get("/customer/dashboard", auth.verifyCustomer, function (req, res) {
    Customer.find({ cid: req.customerInfo._id })
        .then(function () {
            res.json({
                userData: {
                    username: req.customerInfo.username,
                    email: req.customerInfo.email,
                    phone: req.customerInfo.phone,
                    address: req.customerInfo.address,
                    image: req.customerInfo.image,
                },


            })
        }).catch(function (err) {
            res.status(400).json({ success: false, message: "Unable to fetch data" })
        })
    // console.log(req.customerInfo);
    //send response to customer
})

//profile update of customer
router.put("/customer/update", auth.verifyCustomer, function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    const image = req.body.image;

    bcryptjs.hash(password, 10, function (e, hashed_password) {

        Customer.updateOne({ _id: req.customerInfo._id },
            {
                username: username,
                email: email,
                phone: phone,
                address: address,
                password: hashed_password,
                image: image

            })
            .then(function () {
                res.json({ msg: "Auth Success", success: true })
            })
            .catch(function (e) {
                res.json(e)
            })

    }
    )

})


module.exports = router;