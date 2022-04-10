// requiring express to handle requests, routes and views
const express = require("express");
const app = express();

// Inbuilt method to recognize the incoming request object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requiring cors to enable apis requests from all devices
const cors=require('cors');
app.use(cors());

