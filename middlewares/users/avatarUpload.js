const uploader = require("../../utilities/singleUpload");

function avatarUpload(req,res,next){
    // Handle file upload logic here
    const upload=uploader(
        "avatars",
        ["image/jpeg","image/jpg","image/png"],
        1 * 1024 * 1024 , // 1MB max size
        "Only .jpg, .jpeg or .png format allowed!!!"
    );

    //call the middleware function
    upload.any()(req,res,(err)=>{
        if(err){
            res?.status(500).json({
                errors:{
                    avatar:{
                        msg:err.message,
                    }
                }
            })
        }else{
            next()
        }
    })
}

module.exports=avatarUpload;