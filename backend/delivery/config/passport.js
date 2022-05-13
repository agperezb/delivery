const JwtStratagy=require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const keys=require('./key');

module.exports=function(passport){

    let opts=[];
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey=keys.secretOrKey;
    passport.use(new JwtStratagy(opts,(jwt_playload,done)=>{

        User.findById(jwt_playload.id,(err,user)=>{

            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }


        });





    }));

}