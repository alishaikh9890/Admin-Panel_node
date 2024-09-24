const admin = require("../models/admin.schema");


const fs = require("fs")

const home = async (req, res)=>{

    let data = await admin.find()
    
    res.cookie("name", "user").send(data); 
 
}

const login = (req, res) => {

    res.render("login", {info: req.flash('info')});
}

const signing = async (req, res) => {
    let {email, password} = req.body
    // res.cookie("name", data.username).send(data)
    // res.redirect("signup");

    let data = await admin.findOne({email:email})
        if(!data){
            return res.send("invalid email")
        }

        if(data.password != password){
            // return res.send("wrong password")
            return res.redirect("signup")
        }


        console.log(data);

        req.flash("info", "User Successfully Logged In")
        // return res.send("logged in")
        return res.redirect("dashboard")
}

// const Local = (req, res) =>{
//     res.send("logged in")
// }

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
    console.log(req.cookies)
     res.render("admin");
}

const dash = async (req, res) =>{
    
   await admin.find({}).then((data) => {
        res.render("dashboard",{
        userData : data,
        info:req.flash('info')
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

module.exports = {home, addUser, getAdduser, dash, delUser, editUser, login, signing,
    //  Local
    };
