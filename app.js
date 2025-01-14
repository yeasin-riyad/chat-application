//External Imports..........

const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const path=require('path');

// Internal Imports............
const {notFoundHandler,errorHandler}=require('./middlewares/common/errorHandler')

const app=express()
dotenv.config()

// Connect to MongoDB Database

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

//request parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//set view engine......
app.set('view engine',"ejs")

//set static folder
app.use(express.static(path?.join(__dirname,'public')))


// parse cookies

app.use(require('cookie-parser')(process.env.COOKIE_SECRET))

//routes setup

//404 not found error handler
app.use(notFoundHandler)

//global error handler
app.use(errorHandler)

//error handling
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


//server listening

const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`Server running on port ${port}`))