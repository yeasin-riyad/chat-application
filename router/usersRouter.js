// External imports

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Internal Imports...


const {getUsers}=require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// Initialize express app
const router=express.Router()

// login page

router.get("/",decorateHtmlResponse("Users"),getUsers)

// router.get('/login',getUsers, (req, res) => {
//     // res.sendFile(__dirname + '/views/login.html');
// });

// register page


module.exports=router;