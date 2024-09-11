const userData = async (req, res) =>{
    let u_data = await user.find()
    res.send(u_data)
}

const signupData = async (req, res) => {
    let s_data = await user.create(req.body);
    res.send(s_data)
}
module.exports = {userData}