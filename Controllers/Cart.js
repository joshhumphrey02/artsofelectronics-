const { db } = require("../models/sql/database");
const { activeQueries } = require('../models/Cart/queries');
const { categories } = require("../data.json");
require('dotenv').config();
let image_url = process.env.IMAGE_URL;
let sql;

module.exports = {
  Cart: async (req, res) => {
    try {
      req.session.previous_url = req.url;
      sql = req.session.passport ?
        `SELECT * FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${req.session.passport.user}` : 
        `SELECT * FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.session_id = "${req.sessionID}"`;
        await db(sql, (err, result)=>{
          if(req.session.device == "phone"){
           return res.render("mobile/cart", { result, image_url, categories, notLogged: req.flash('notLogged')});
          }
          else{
            return res.render("view/cart", { result, image_url, userName: req.session.lastName });
          }
        })
    } catch (err) {
      console.log(err);
    }
  },
  postCart: async (req, res) => {
    const {productId, productQty, query} = req.body;
    try {
      activeQueries(query, productId, productQty, req, (err, result)=>{
        if(err) console.log("controller" + err);
        result ? res.send({data: true}) : res.send({data: false});
      })
    } catch (err) {
      console.log(err);
    }
  },
  getCart: async (req, res) => {
    try {
      let user_id = req.session.passport ? req.session.passport.user : null;
      let session_id = req.sessionID ? req.sessionID : null;
      sql = req.session.passport ?
        `SELECT cart.user_id, products.price, products.name, cart.product_qty, cart.checked FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${user_id}` : 
        `SELECT cart.user_id, products.price, products.name, cart.product_qty, cart.checked FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.session_id = "${session_id}"`;
        db(sql, (err, result)=>{
          if(err) console.log(err)
          res.send(result);
        })
    } catch (err) {
      console.log(err); 
    }
  }
}