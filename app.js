const mongoose= require("mongoose");

const express= require("express");
const app= express();
const path=require("path")
const cors= require('cors');
app.use(cors());

require("./database/db");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/uploads'));


const customerRoute=require("./routes/customerRoutes");
app.use(customerRoute);
const adminRoute=require("./routes/adminRoutes");
app.use(adminRoute);
const ProfessionalRoute=require("./routes/professionalRoutes");
app.use(ProfessionalRoute);
const serviceRoute=require("./routes/serviceRoutes");
app.use(serviceRoute);
const categoryRoute=require("./routes/categoryRoutes");
app.use(categoryRoute);

app.listen("90");


