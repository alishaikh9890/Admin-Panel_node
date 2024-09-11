const {Router} = require("express");
const { userData } = require("../controllers/user.controller");

const u_router = Router()

u_router.get("/create", userData)




module.exports = u_router;