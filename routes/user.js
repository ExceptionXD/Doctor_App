const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const socket = require("socket.io");

const mongoose = require("mongoose");
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth");

//If we get user/login request
router.get("/login", (req, res) => {
  res.render("login");
});

//If we get user/register request
router.get("/register", (req, res) => {
  res.render("register");
});

var options = {
  auth: {
    api_key:
      "############################################3",
  },
};

var mailer = nodemailer.createTransport(sgTransport(options));

//If we get the register form i.e POST Request
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  let errors = [];
  // console.log(req.body);

  //Validations
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please Fill All Fields" });
  }
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords Do Not Match" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  //Validation Successfull//
  else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email is Already Registerd" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        //Now enter in the Database
        const Mycode = Math.floor(100000 + Math.random() * 900000);
        const newUser = new User({
          name,
          email,
          password,
          activationCode: Mycode,
        });

        //Hash Password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;

            let emailSend = {
              to: email,
              from: "dummy@gmail.com",
              subject: `Hi ${name} Here is Your Activation Code `,
              text: `Your Activation Code is ${Mycode}`,
              html: `<!DOCTYPE html>
              <html>
              
              <head>
                  <title></title>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <style type="text/css">
                      @media screen {
                          @font-face {
                              font-family: 'Lato';
                              font-style: normal;
                              font-weight: 400;
                              src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                          }
              
                          @font-face {
                              font-family: 'Lato';
                              font-style: normal;
                              font-weight: 700;
                              src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                          }
              
                          @font-face {
                              font-family: 'Lato';
                              font-style: italic;
                              font-weight: 400;
                              src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                          }
              
                          @font-face {
                              font-family: 'Lato';
                              font-style: italic;
                              font-weight: 700;
                              src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                          }
                      }
              
                      /* CLIENT-SPECIFIC STYLES */
                      body,
                      table,
                      td,
                      a {
                          -webkit-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                      }
              
                      table,
                      td {
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                      }
              
                      img {
                          -ms-interpolation-mode: bicubic;
                      }
              
                      /* RESET STYLES */
                      img {
                          border: 0;
                          height: auto;
                          line-height: 100%;
                          outline: none;
                          text-decoration: none;
                      }
              
                      table {
                          border-collapse: collapse !important;
                      }
              
                      body {
                          height: 100% !important;
                          margin: 0 !important;
                          padding: 0 !important;
                          width: 100% !important;
                      }
              
                      /* iOS BLUE LINKS */
                      a[x-apple-data-detectors] {
                          color: inherit !important;
                          text-decoration: none !important;
                          font-size: inherit !important;
                          font-family: inherit !important;
                          font-weight: inherit !important;
                          line-height: inherit !important;
                      }
              
                      /* MOBILE STYLES */
                      @media screen and (max-width:600px) {
                          h1 {
                              font-size: 32px !important;
                              line-height: 32px !important;
                          }
                      }
              
                      /* ANDROID CENTER FIX */
                      div[style*="margin: 16px 0;"] {
                          margin: 0 !important;
                      }
                  </style>
              </head>
              
              <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                  <!-- HIDDEN PREHEADER TEXT -->
                  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <!-- LOGO -->
                      <tr>
                          <td bgcolor="#FFA73B" align="center">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                  <tr>
                                      <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                  <tr>
                                      <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                          <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                  <tr>
                                      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                          <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just Enter the Below Code .</p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td bgcolor="#ffffff" align="left">
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                      <table border="0" cellspacing="0" cellpadding="0">
                                                      <h1>${Mycode}</h1>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr> 
                    
                  </table>
              </body>
              
              </html>`,
            };

            mailer.sendMail(emailSend, function (err, res) {
              if (err) {
                console.log(err);
              }
              console.log("Email Sent Successfully");
            });

            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "Activation Code Sent to Email");
                res.redirect("/user/activate");
              })
              .catch((e) => console.log(e));
          });
        });
      }
    });
  }
});

//Activate Page
router.get("/activate", (req, res) => {
  res.render("activationCode");
});

//Handle Activation
router.post("/activate", (req, res) => {
  const { code } = req.body;

  if (
    User.findOne({ accountActive: false }, { activationCode: code }).then(
      (user) => {
        if (user) {
          var myquery = { accountActive: false };
          var newvalues = { $set: { accountActive: true } };

          User.updateOne(myquery, newvalues).then((user) => {
            if (user) {
              req.flash("success_msg", "Account Successfully Activated ");
              res.redirect("/user/login");
            } else {
              req.flash("error_msg", "Some Error");
              res.redirect("/user/activate");
            }
          });
        } else {
          req.flash("error_msg", "Sorry Activation Code does not match !");
          res.redirect("/user/activate");
        }
      }
    )
  );
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout Handle
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_msg", "You have Logged Out ");
  res.redirect("login");
});

//Booking Page Get
router.get("/bookings", (req, res) => {
  res.render("bookings");
});

//Booking Page POST
router.post("/bookings", (req, res) => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const { name, email, age, deptOption, time, notes } = req.body;
  let emailSend = {
    to: email,
    from: "dummy@gmail.com",
    subject: `Hi ${name} Your Appointment Details `,
    text: `Your Appointment Code is ${code}`,
    html: `<div class = container card card-body><h1>Your Appointment is Booked with Us at ${time} and your secret Code is ${code}</b></h1> </div>`,
  };

  mailer.sendMail(emailSend, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log("Email Sent Successfully");
  });
  req.flash(
    "success_msg",
    "Appointment Successfully Booked ,Please Check Your Mail "
  );
  res.redirect(`/dashboard`);
});

module.exports = router;
