import multer from 'multer';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/documents/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    },
});

const upload = multer({ storage });



const uploadPolicy = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const uploadDir = 'uploads/policyDocuments/';
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); 
            },
        })
    }
);

export { upload, uploadPolicy }

