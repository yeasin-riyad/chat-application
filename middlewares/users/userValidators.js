// External Imports
const {check, validationResult}=require('express-validator')
const {unlink}=require('fs');
const path = require('path');

// add user

const addUserValidators=[
    check('name').not().isEmpty().withMessage('Name is required').isAlpha("en-US",{ignore:"-"}).withMessage("Name must not contain anything other than alphabet"),
    check('email').isEmail().withMessage('Email is not valid').custom(async(value)=>{
        const user=await User.findOne({email:value});
        try{
            if(user){
                throw createError('Email already exists');
            }
        }catch(err){
            throw createError(err?.message)
        }
    }),
    check('mobile').isMobilePhone("bn-BD",{
        strictMode:true,
    })
    .withMessage("Mobile Number must be a valid Bangladeshi mobile Number")
    .custom(async(value)=>{
        try{
            const user=await User.findOne({mobile:value});

            if(user){
                throw createError('Mobile Number already exists');
            }
        }catch(err){
            throw createError(err?.message)
        }
    }),
    check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];

const addUserValidationHandler=function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        if(req.files.length>0){
            const {filename}=req.files[0];
            unlink(
                path.join(__dirname,`/../public/uploads/avatars/${filename}`),
                (err)=>{
                    if(err) console.error(err);
                }
            )

        }
       
        
        return res.status(400).json({errors:errors.array()});
    }else{
        next();
    }
}

module.exports={
    addUserValidators,
    addUserValidationHandler,

  
}

// exports.addUser = [
//   check('name', 'Name is required').not().isEmpty(),
//   check('email', 'Please enter a valid email').isEmail(),
//   check('password', 'Password must be at least 8 characters long').isLength({min: 8}),
//   check('password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
// ]