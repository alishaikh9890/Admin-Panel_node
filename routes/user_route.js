const {Router} = require("express");
const { userData, signupData, signing, profile, logout, signup, forget, reset, otpPage, otpSend } = require("../controllers/user.controller");
const passport = require("passport");
const accessAuth = require("../middlewares/accessAuth");

const u_router = Router()

u_router.post("/create", signupData);

u_router.get("/signup", signup)

u_router.post("/signing", passport.authenticate('local', {successRedirect:"/dashboard", failureRedirect:"/login"}), signing)

u_router.get("/profile", profile);

u_router.get("/logout", logout);

u_router.get("/forget", forget)

u_router.get("/otp", otpPage)

u_router.post("/otp", otpSend)

u_router.post("/reset", reset)



module.exports = u_router;