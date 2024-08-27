const express = require("express");
const {home, addUser, getAdduser, dash, delUser, editUser} = require("../controllers/admin.controller");
const valid = require("../middlewares/admin.maddlewares");

const router = express.Router();



const multer = require("multer");

// file upload start

const fileupload = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, "uploads")
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const ImageUpload = multer({storage : fileupload}).single("pic");

// file upload end 

router.get("/", home);

router.post("/addUser" , ImageUpload, valid, addUser);


router.get("/addUser", getAdduser);

router.get("/dashboard", dash);

router.get("/delUser/:id", delUser);

router.get("/editUser/:id", editUser);

module.exports = router;