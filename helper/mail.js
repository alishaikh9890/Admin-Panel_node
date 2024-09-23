const nodemailer = require("nodemailer");

const mailer = () => {
    const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"rwbn1.alishan.as@gmail.com",
        pass:"zfqkfxunquouwqxc"
    }
})
return transporter;
}

module.exports = mailer;
