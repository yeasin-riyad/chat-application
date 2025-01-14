
//Use http-errors Package for Smoothly error Handling......
const createError=require('http-errors');
    


//404 Not Found
function notFoundHandler(req,res,next){
    next(createError(404,"Your Requested Content Was NOt Found......."))
}

//default Error Handler
function errorHandler(err,req,res,next){
    res.locals.message=err?.message;
    res.render('error')

    //Or,
    // res.render('error',{
    //     message:err.message,
    // })


    // res.status(err.status||500);
    // res.json({
    //     error:{
    //         message:err.message,
    //         status:err.status
    //     }
    // })
}

//exporting the functions
module.exports={
    notFoundHandler,
    errorHandler
 
}