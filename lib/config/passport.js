'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });

  // add other strategies for more authentication flexibility
  passport.use('local',new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password', // this is the virtual field on the model
          passReqToCallback: true
    },

    function(req,email, password, done) {
        //console.log(req.body);
        if (req.body.email=='no@no.no' && req.body.name){
            //console.log(req.body.name)
            User.findOne({
                name: req.body.name
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false,{errors:{nameLogin:{
                        message: 'такой  Login не зарегистрирован'
                    }}});
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {errors:{passwordLogin:{
                        message: 'неверный login или пароль'
                    }}});
                }
                //console.log(user);
                return done(null, user);
            });
        } else {
            User.findOne({
                email: email
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false,{errors:{emailLogin:{
                        message: 'такой  e-mail не зарегистрирован'
                    }}});
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {errors:{passwordLogin:{
                        message: 'неверный e-mail или пароль'
                    }}});
                }
                //console.log(user);
                return done(null, user);
            });
        }

    }
  ));
};