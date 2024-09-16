const user = require("../models/user.schema");

const access = async (req, res, next) => {
    let {email, password}  = req.body;
    let access_data = await user.findOne({email: email})
    if(!access_data){
        return res.redirect("signup")
    }
    if(access_data.password != password){
        return res.redirect("signup")
    }

    console.log(data);
    return next();
}

module.exports = access;