const valid = (req, res, next) => {
    let {username, email, password, phone, pic} = req.body;

    if(username && email && password && phone){
        return next();
    }
    else 
    {
        res.status(400).send("not valid data "+pic);
    }
}

module.exports = valid;