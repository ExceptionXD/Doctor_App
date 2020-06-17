const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require('passport');

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({usernameField : 'email' },function (email, password, done) {
      User.findOne({ email: email , accountActive : true}, function (err, user) {
        if (err) {
          return done(err);
        }
        //Checking if User Exists or not
        if (!user) {
          return done(null, false, { message: "User is not Registered" });
        }

        //Checking the Password
        bcrypt.compare(password, user.password, (err, matched) => {
          if (err) return err;
          if (!matched) {
            return done(null, false, { message: "Password Does not Match" });
          }

          if (matched) {
            return done(null, user);
          }
        });
      });
    })
  );
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


