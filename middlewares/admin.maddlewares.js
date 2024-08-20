

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


const isAuth = (req, res, next) => {
    console.log(req.cookies);
    next();
}

module.exports = {valid, isAuth};