const { db } = require("../models/sql/database");
const { features } = require("../models/home/features");
const { categories } = require("../data.json");
const bcrypt = require("bcryptjs");
let sql = "";
let data = "";

exports.Home = async (req, res) => {
  try {
    req.session.previous_url = req.url;
    let id = req.session.passport ? req.session.passport.user : "";
    sql = "SELECT * FROM products ORDER BY product_id LIMIT 30";
    await db(sql, data, (err, products) => {
      if(req.session.device == "phone"){
        let notLogged = req.flash('notLogged');
        let featuredList = [ "Accessories", "Modules", "Sensors", "Batteries", "Ic's", "Boards", "Capacitors", "Resistor" ];
        let featured = features(products, featuredList);   
         sql = "SELECT * FROM products ORDER BY product_id DESC LIMIT 6";
        db(sql, (err, recent) => {
          res.render("mobile/home", {
            categories, 
            products,
            recent: recent,
            featured,
            notLogged
          });
        });
      }
      else{
        let featuredList = [ "Accessories", "Module", "Sensors", "Batteries", "Ic's" ];
        let featured = features(products, featuredList);
        sql = `SELECT * FROM customers WHERE user_id =${id}`;
        db(sql, (err, user) => {
          res.render("view/home", {
            categories, 
            products,
            userName: user ? user[0].last_name : false,
            featured,
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  const { email, password, special } = req.body;
  let sql = `SELECT * FROM customers WHERE email="${email}"`;
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
};

exports.Product = (req, res) => {
  req.session.previous_url = req.url;
  sql = `SELECT * FROM products WHERE name= "${req.params.name}"`;
  db(sql, (err, product) => {
    sql = `SELECT * FROM products WHERE category ='${product[0].category}'  ORDER BY id DESC LIMIT 3`;
    db(sql, (err, products)=>{
      if(req.session.device == "phone"){
        let notLogged = req.flash('notLogged');
        res.render("mobile/product", {product, categories, notLogged});
      }else{
        let id = req.session.passport ? req.session.passport.user : "";
        sql = `SELECT * FROM customers WHERE user_id =${id}`;
        db(sql, (err, user) => {
          res.render("view/product", { 
            product,
            products,
            userName: user ? user[0].last_name : false
          });
        })
      }
    }) 
  });
};


//user logout session
exports.logout = (req, res) => {
  req.logout({keepSessionInfo: false}, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};
