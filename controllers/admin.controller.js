const admin = require("../models/admin.schema");

const fs = require("fs")

const home = (req, res)=>{
    res.send("Alishan")
}

const addUser = async(req, res) =>{

    let editId = req.body.editId;

    let { username, email,phone, password, pic} = req.body;
    if(editId){
        if(req.file){

          
            await admin.findById(editId).then((editRecord) =>{
                fs.unlinkSync(editRecord.pic);   
            })
             pic = req.file.path;
                      await admin.findByIdAndUpdate(editId, {
                                username : username,
                                email : email,
                                phone : phone,
                                password : password, 
                                pic : pic,
                            }).then(() => {
                                res.redirect("dashboard")
                        });     
        }

        else{
            await admin.findById(editId).then((old) =>{
                 admin.findByIdAndUpdate(editId, {
                    username: username,
                    email : email,
                    phone : phone,
                    password : password,
                    pic  : old.pic
                }).then(() => {
                    res.redirect("dashboard")
            });     
            })
        }
    }
    else {
        let pic = "";
        pic = req.file.path
        await admin.create({
            username : username,
            email : email,
            phone : phone,
            password : password,
            pic : pic
        }).then(() => {
                res.redirect("dashboard")
        });        
    }


}

const getAdduser = (req, res) =>{
     res.render("admin");
}

const dash = async (req, res) =>{
    
   await admin.find({}).then((data) => {
        res.render("dashboard",{
        userData : data
     })
   })
}


const delUser = async(req,res) => {
    const {id}  = req.params;
    
    await admin.findById(id).then((singleRecord) => {
        fs.unlinkSync(singleRecord.pic)
    })


    await admin.findByIdAndDelete(id).then((data) => {
        res.redirect("back")
    })
    
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
