const {db} = require('../models/sql/database');
const { categories, profile } = require("../data.json");
const bcrypt = require("bcryptjs");
let sql;

module.exports = {
    Profile: (req, res)=>{
        try {
            sql = `SELECT * FROM customers WHERE user_id = ${req.session.passport.user}`;
            db(sql, null, (err, user)=>{
                if(req.session.device == "phone"){
                   return res.render('mobile/profile', {user, categories});
                }
                else{
                  return res.render('view/profile/overview', {
                    layout: "./layouts/profile",
                    profile,
                    user,
                    category: "Overview"
                  })
                }
            })
        } catch (error) {
            if(err)console.log(err)
            next();
        }
    },
    Category: (req, res)=>{
      try {
        let category = req.params.category;
        category = (category == "Wish list") ? "Favorite" : category;
        sql = `SELECT * FROM customers WHERE user_id = ${req.session.passport.user}`;
        db(sql, null, (err, user)=>{
          return res.render(`view/profile/${category}`, {
            layout: "./layouts/profile",
            profile,
            user,
            category
          })
        })
      } catch (error) {
        console.log(error);
      }
    },
    getUser: async (req, res) => {
        const { email, password, special } = req.body;
        sql = `SELECT * FROM customers WHERE email="${email}"`;
        try {
          await db(sql, null, (err, result) => {
            if (result.length > 0) {
              if (password) {
                bcrypt.compare(password, result[0].password, (err, isMatched) => {
                  err ? console.log('something happened while comparing passwords', err) : null;
                  if (isMatched) return res.send({ result: true });
                  return res.send({ result: false });
                });
              }
              else{
                if(special) return res.send({ result: true });
                return res.send({result: false});
              }
            }else{
              if(special) return res.send({ result: false});
              return res.send({result: true});
            }
          });
        } catch (err) {
          console.log("something unknown happened", err);
        } 
    },
    postAddress: async (req, res, next) => {
      try {
        const { phone, street, country, state, lga, apartment } = req.body;
        sql = `SELECT * FROM address WHERE user_id = ${req.session.passport.user}`;
        const data = { user_id: req.session.passport.user, phone, street, country, state, lga, apartment};
        db(sql, null, (err, result) => {
          if(err) console.log(err)
          if (result.length == 0) {
            sql = `INSERT INTO address SET?`;
            db(sql, data, (err) => {
              if (err) console.log('An error occured' + err);
              return res.send({ added: "added" }).status(200);
            });
          } else {
            sql = `UPDATE address SET? WHERE user_id = ${req.session.passport.user}`;
            db(sql, data, (err) => {
              if(err)console.log(err);
              return res.send({ added: "added" }).status(200);
            });
          }
        });
      } catch (err) {
        next();
      }
    },
    getAddress: async (req, res, next) => {
      try {
        sql = "SELECT * FROM address WHERE user_id =?";
        const id = req.session.passport.user;
        db(sql, id, (err, result) => {
            if(err)console.log(err);
          return res.send(result).status(200);
        });
      } catch (err) {
        next();
      }
    }
}