// const LocalStrategy = require("passport-local").Strategy

const user = require("../models/user.schema");


// const LocalAuth = (passport) => {
//     passport.use(
//         new LocalStrategy(async(username, password, done) => {
//         let user = await admin.findOne({username: username});

//     try{
//         if(!user){
//             return done(null, false)
//         }
//         if(!user.password != password) {
//             return done(null, false);
//         }
//         return done(null, user)
//     }
//     catch(error){
//         done(error, false)
//     }
//       })
//     );

//     passport.serializeUser((user, done) =>{
//         done(null, user.id);
//     });

//     passport.deserializeUser(async(id , done) =>{
//         let user = await admin.findById(id);
//         return done(null, user)
//     })
// }

//  module.exports = LocalAuth;


const LocalStrategy = require("passport-local").Strategy 

const LocalAuth = (passport) =>{
    passport.use(new LocalStrategy(async(username, password, done) => {
        let User = await user.findOne({username: username});

        try {
              if(!User){
            return done(null, false);
        }
        if(User.password != password){
            return done(null, false);
        }
        return done(null, User);

        } catch (error) {
            return done(error, false)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async(id, done) => {
        let User = await user.findById(id);
        return done(null, User)
    })
}

module.exports = LocalAuth;