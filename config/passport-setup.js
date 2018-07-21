const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model')

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
    
});

passport.use(
    new GoogleStrategy({
        clientID : '802713779447-ip4s9n56fivets0cdpnssdjvlbfv1frr.apps.googleusercontent.com',
        clientSecret : 'weCahO51zkxr5sQz4Ecacaob',
        callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done)=>{
        //check if user already exists
        User.findOne({
            googleId:profile.id
        }).then((existingUser)=>{
            if(existingUser){
                console.log('Already existing user', existingUser)
                done(null,existingUser)
            }else{
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save()
                    .then((newUser)=>{
                        console.log('new User'+ newUser)
                        done(null,newUser)
                    })
            }
        })

        

    })
)