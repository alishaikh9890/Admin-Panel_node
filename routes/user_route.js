const {Router} = require("express");
const { userData, signupData, signing } = require("../controllers/user.controller");
const passport = require("passport");

const u_router = Router()

u_router.post("/create", signupData);

u_router.post("/signing", passport.authenticate('local'), signing)


module.exports = u_router;