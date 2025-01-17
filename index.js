
const path = require("path");
const express = require("express");
const router = require("./routes/route");

const flash = require("connect-flash");

const db = require("./config/db");
const cookies = require("cookie-parser");
const session = require("express-session");
const passport = require("passport")
const LocalAuth = require("./middlewares/LocalAuth");
const u_router = require("./routes/user_route");
const port = 9050;
const app = express();
LocalAuth(passport);

app.use(cookies())
app.use(flash())
app.use(session({secret:"private-key"}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use("/",router)

app.use("/user", u_router)

app.set("view engine", "ejs");

app.set("views",__dirname+"/view")

app.use(express.static(__dirname+"/public"))

app.use("/uploads", express.static(path.join(__dirname, "uploads/")))
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")))

app.listen(port, (err)=>{
    if(err){
       console.log("server is not connected");
        return false;
    } 
    db()
    console.log("server is running on port: "+port)
})
