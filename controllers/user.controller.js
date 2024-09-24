const user = require("../models/user.schema")
const admin= require("../models/admin.schema");
const mailer = require("../helper/mail");

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
    req.flash("info", "User, Logged Out !")
    res.redirect("/login")
  });
}

const forget = (req, res) =>{
    res.render("forget",{info:req.flash('info')});
}

const otpPage = (req, res) =>{
    req.flash("info", "Enter Register Email to Get OTP")
    res.render("otp",{info:req.flash('info')});
}

let otp = Math.floor(Math.random()*100000);

const otpSend = (req, res) =>{
    const mail = mailer();
    const mailOptions = {
        from :"rwbn1.alishan.as@gmail.com",
        to: req.body.email,
        subject: "Password Reset OTP",
        html: `Password reset Request- <br/>
                <h3>${otp}</h3>
                Do not share the OTP keep is secreat.
        `
    }

    mail.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    });
    req.flash("info","OTP Sent on Registered email")
    res.redirect("forget")

}


const reset = async (req, res) => {
    let {email, addotp, newpassword} = req.body;

    let resetdata = await user.findOne({email: email});

    if(!resetdata){
        res.send("Email not valid");
      
    }
    else if(addotp != otp){
        res.send("OTP is invalid");
        req.flash("info","Otp is invalid")
    }
    else{
           await user.findByIdAndUpdate(resetdata.id,       {password: newpassword})
           req.flash("info", "Password Reset, Please login again !")
    res.redirect("/login")
    }
 
   
}

module.exports = {userData, signupData, signing, profile, logout, signup, forget,reset, otpPage, otpSend}