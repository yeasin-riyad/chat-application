// External imports

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Internal Imports...


const {getLogin}=require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// Initialize express app
const router=express.Router()

// login page

router.get("/",decorateHtmlResponse("Login"),getLogin)

router.get('/login',getLogin, (req, res) => {
    // res.sendFile(__dirname + '/views/login.html');
});

// register page


module.exports=router;