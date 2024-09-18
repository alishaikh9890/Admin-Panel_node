const user = require("../models/user.schema")
const admin= require("../models/admin.schema")

const userData = async (req, res) =>{
//     let u_data = await user.find()
//     res.send(u_data)
 }

const signupData = async (req, res) => {
    let s_data = await user.create(req.body);
    res.send(s_data)
  
}

const signup = (req, res) =>{
    res.render("signup")
}



const signing = (req, res) => {

    res.send("user logged in using passport js");
    // let {email, password} = req.body
    // // res.cookie("name", data.username).send(data)
    // // res.redirect("signup");

    // let data = await user.findOne({email:email})
    //     if(!data){
    //         return res.redirect("back")
    //     }

    //     if(data.password != password){
    //         // return res.send("wrong password")
    //         return res.redirect("back")
    //     }

    //     console.log(data);
    //     // return res.send("logged in")
    //     // return res.redirect("../dashboard")


}


const profile = (req, res) =>{
    res.send(req.user)
}

const logout = (req, res) =>{
  req.logOut((err) => {
    if(err){
        console.log(err)
    }
    res.redirect("/login")
  });
}

module.exports = {userData, signupData, signing, profile, logout, signup}