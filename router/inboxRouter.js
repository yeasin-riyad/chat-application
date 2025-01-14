// External imports

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

// Internal Imports...
const {getInbox}=require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// Initialize express app
const router=express.Router()

// login page

router.get("/",decorateHtmlResponse("Inbox"),getInbox)




module.exports=router;