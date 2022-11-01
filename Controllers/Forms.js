const { db } = require("../models/sql/database");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {mail} = require('../models/user_msg');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

module.exports = {
  Register: async (req, res) => {
    const { firstName, lastName, email, password} = req.body;
    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        sql = "INSERT INTO customers SET?";
        let data = {
          user_id: Math.floor((Math.random() * Date.now()) / 100000),
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: hash
        };
        db(sql, data, (err) => {
          err ? console.log("User not registered", err) : null;
          if(err) return res.send({result: false});
          return res.send({ result: true });
        });
      });
    });
  },
  postLogin: async (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: `${req.session.previous_url}`,
      failureRedirect: "/",
      failureFlash: true,
    })(req, res, next);
  },
  emailVerification: async(req, res)=>{
    try {
      const user = req.body.email;
      req.session.code = Math.floor((Math.random() *  9999) + 1);
      const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SERECT, process.env.REDIRECT_URL);
      oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.ADMIN_EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SERECT,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken
        }
      })
      let result = await transport.sendMail(mail(user, req.session.code));
      console.log(result.rejected)
      if(result.accepted){
         return res.send({result: true});
      }
      console.log(("Comfirmation message not sent", + result));
      return res.send({result: null});
    } catch (error) { 
      if(error) console.log(("Comfirmation message not sent", + error));
      return res.send({result: null});
    }
  },
  emailCode: (req, res)=>{
    let code = req.body.code;
    if(req.session.code == Number(code)) return res.send({code: true});
    return res.send({code: false});
  },
  logout: (req, res) => {
    req.logout({keepSessionInfo: false}, (err) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  }
}