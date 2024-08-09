const admin = require("../models/admin.schema");

const fs = require("fs")

const home = (req, res)=>{
    res.send("Alishan")
}

const addUser = async(req, res) =>{
    console.log(req.body.editId)

    if(req.body.editId){
        await admin.findByIdAndUpdate(req.body.editId, req.body)
    }
    else {

        let { username, email,phone, password, pic} = req.body;
        pic = req.file.path
        console.log(req.file)
        await admin.create({
            username : username,
            email : email,
            phone : phone,
            password : password,
            pic : pic
        });        
    }
    res.redirect("dashboard")

}

const getAdduser = (req, res) =>{
     res.render("admin")
}

const dash = async (req, res) =>{
    
   await admin.find({}).then((data) => {
        res.render("dashboard",{
        userData : data
     })
   })
}

const delUser = async(req,res) => {
    let {id}  = req.params;
    await admin.findById(id).then((singleRecord) => {
        fs.unlinkSync(singleRecord.pic)
    })

    await admin.findByIdAndDelete(id);
    res.redirect("back")
}

const editUser = async(req, res) => {
    let {id} = req.params;
    await admin.findById(id).then((item) =>{
        res.render("edit", {
            item
        })
    });
}

module.exports = {home, addUser, getAdduser, dash, delUser, editUser};

