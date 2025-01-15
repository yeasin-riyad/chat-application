// External imports

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Internal Imports...


const {getUsers, addUser}=require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidators');

// Initialize express app
const router=express.Router()

// login page
router.get("/",decorateHtmlResponse("Users"),getUsers)

// Add User
router.post("/",avatarUpload,addUserValidators,addUserValidationHandler,addUser)

// router.get('/login',getUsers, (req, res) => {
//     // res.sendFile(__dirname + '/views/login.html');
// });

// register page


module.exports=router;