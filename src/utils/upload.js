const multer = require("multer");
const path  = require('path')


const storage = multer.diskStorage({
    destination: path.join(__dirname ,'../' , '../','public/uploads/') ,
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
]

const upload = multer({
    storage: storage,
    limits: {
        fields: 5,
        fieldNameSize: 50,
        fieldSize: 20000,
        fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90

    },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'))
        }
        cb(null, true)
    }
});



module.exports = {
    upload
}