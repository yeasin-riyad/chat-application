const multer = require('multer'); // For file upload handling
const path = require('path');     // For file path manipulations
const createError = require('http-errors'); // To create HTTP errors (optional, but used for `fileFilter` errors)

// The uploader function
function uploader(subfolder_path, allowed_file_types, max_file_size, error_msg) {
    // Base folder for uploads
    const UPLOAD_FOLDER = path.join(__dirname, '../public/uploads/avatars');

    var upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, UPLOAD_FOLDER + subfolder_path);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        }),
        fileFilter: function (req, file, cb) {
            var ext = path.extname(file.originalname);
            if (allowed_file_types.indexOf(ext) > -1) {
                cb(null, true);
            } else {
                cb(createError(error_msg), false);
            }
        },
        limits: { fileSize: max_file_size }
    });

    return upload;
}

module.exports = uploader;
