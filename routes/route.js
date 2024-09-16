const express = require("express");
const {home, addUser, getAdduser, dash, delUser, editUser, signup, signing, Local} = require("../controllers/admin.controller");
const {valid, isAuth} = require("../middlewares/admin.maddlewares");
// const passport = require("passport")

const router = express.Router();



const multer = require("multer");
// const LocalAuth = require("../middlewares/LocalAuth");

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

router.get("/",isAuth, home);

router.post("/addUser" , ImageUpload, valid, addUser);


router.get("/addUser", getAdduser);

router.get("/dashboard", dash);

router.get("/delUser/:id", delUser);

router.get("/editUser/:id", editUser);

router.get("/signup", signup)

// router.post("/signing",LocalAuth, signing)
router.post("/signing", signing)

// router.post("/local",passport.authenticate("local"),Local )

module.exports = router;