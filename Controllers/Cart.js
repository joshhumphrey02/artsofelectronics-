const { db } = require("../models/sql/database");
const { activeQueries } = require('../models/Cart/queries');
const { categories } = require("../data.json");
let sql;


exports.Cart = async (req, res) => {
  try {
    req.session.previous_url = req.url;
    sql = req.session.passport ?
      `SELECT * FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${req.session.passport.user}` : 
      `SELECT * FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.session_id = "${req.sessionID}"`;
      await db(sql, (err, result)=>{
        if(req.session.device == "phone"){
          let notLogged = req.flash('notLogged');
         res.render("mobile/cart", { result, categories, notLogged});
        }
        else{
          let id = req.session.passport ? req.session.passport.user : "";
          sql = `SELECT * FROM customers WHERE user_id =${id}`;
          db(sql, (err, user) => res.render("view/cart", { result, userName: user ? user[0].last_name : false }));
        }
      })
  } catch (err) {
    console.log(err);
  }
};

exports.postCart = async (req, res) => {
  const {productId, productQty, query} = req.body;
  try {
    let user_id = req.session.passport ? req.session.passport.user : null;
    let session_id = req.sessionID ? req.sessionID : null;
    activeQueries(query, productId, productQty, user_id, session_id, (err, result)=>{
      if(err) console.log("controller" + err);
      result ? res.send({data: true}) : res.send({data: false});
    })
  } catch (err) {
    console.log(err);
  }
};


exports.getCart = async (req, res) => {
  try {
    let user_id = req.session.passport ? req.session.passport.user : null;
    let session_id = req.sessionID ? req.sessionID : null;
    sql = req.session.passport ?
      `SELECT cart.user_id, products.price, products.name, cart.product_qty, cart.checked FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${user_id}` : 
      `SELECT cart.user_id, products.price, products.name, cart.product_qty, cart.checked FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.session_id = "${session_id}"`;
      db(sql, (err, result)=>{
        res.send(result);
      })
  } catch (err) {
    console.log(err); 
  }
};
