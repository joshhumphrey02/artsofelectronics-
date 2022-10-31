const { db } = require("../models/sql/database");
const { features, recent, mobileFeatures, rows } = require("../models/home/modules");
const { subCategory } = require("../models/home/subCat");
const { categories} = require("../data.json");
let sql = "";
let data = "";

module.exports = {
  Home: async (req, res) => {
    try {
      let platform = req.session.device == "phone" ? "mobile" : "view";
      req.session.previous_url = req.url;
      sql = "SELECT * FROM products ORDER BY product_id LIMIT 30";
      await db(sql, data, (err, products) => {
        let featured = req.session.device == "phone" ? mobileFeatures(products) : features(products);
        let options = {
          categories, 
          products,
          recent: recent(products, 6),
          notLogged : req.flash('notLogged')
        }
        if(!req.session.device == "phone"){
          options = {
            categories, 
            products,
            userName: req.session.firstName ? req.session.firstName : false,
          }
        }
        return res.render(`${platform}/home`, {...options, featured})
      });
    } catch (error) {
      console.log(error);
    }
  },
  Category: async(req, res)=>{
    try {
      let platform = req.session.device == "phone" ? "mobile" : "view";
      req.session.previous_url = req.url;
      let category = req.params.category;
      sql = `SELECT * FROM products WHERE category = "${category}" ORDER BY product_id LIMIT 30`;
      await db(sql, data, (err, products) => {
       let options = {
          categories : subCategory(category),
          subs: rows(products, [...subCategory(category)]),
          userName: req.session.firstName ? req.session.firstName : false,
        }
        if(req.session.device == "phone"){
          options = {
            categories : subCategory(category),
            notLogged : req.flash('notLogged')
          }
        }
        return res.render(`${platform}/categories`, {...options})
      });
    } catch (error) {
      console.log(error);
    }
    
  },
  SubCategory: async(req, res)=>{
    try {
      let platform = req.session.device == "phone" ? "mobile" : "view";
      req.session.previous_url = req.url;
      let featuredList = [ "Accessories", "Modules", "Sensors", "Batteries", "Ic's", "Diodes", "Capacitors", "Resistors" ];
      sql = "SELECT * FROM products ORDER BY product_id LIMIT 30";
      await db(sql, data, (err, products) => {
        let options = {
          categories, 
          products,
          recent: recent(products, 6),
          featured : mobileFeatures(products, featuredList, 1),
          notLogged : req.flash('notLogged')
        }
        if(!req.session.device == "phone")options = {
          categories, 
          products,
          userName: req.session.firstName ? req.session.firstName : false,
          featured : features(products, featuredList.slice(0, 4)),
        }
        return res.render(`${platform}/sub_category`, {...options})
      });
    } catch (error) {
      console.log(error);
    }
  },
  Product: (req, res) => {
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
  },
  logout: (req, res) => {
    req.logout({keepSessionInfo: false}, (err) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  }
}