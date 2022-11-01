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
          recent: req.session.device == "phone" ? recent(products, 6) : '',
          notLogged : req.flash('notLogged')
        }
        return res.render(`${platform}/home`, {...options, categories, products, featured, userName: req.session.lastName})
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
          subCategories : rows(products, [...subCategory(category)], category, 1),
          subs: rows(products, [...subCategory(category)], category, 7),
          userName: req.session.firstName ? req.session.firstName : false,
        }
        if(req.session.device == "phone"){
          options = {
            subCategories : rows(products, [...subCategory(category)], category, 1),
            subs: rows(products, [...subCategory(category)], category, 7),
            notLogged : req.flash('notLogged')
          }
        }
        return res.render(`${platform}/categories`, {...options, categories})
      });
    } catch (error) {
      console.log(error);
    }
    
  },
  SubCategory: async(req, res)=>{
    try {
      let platform = req.session.device == "phone" ? "mobile" : "view";
      req.session.previous_url = req.url;
      sql = `SELECT * FROM products WHERE sub_category = "${req.params.subCategory}"  ORDER BY product_id LIMIT 30`;
      await db(sql, data, (err, products) => {
        let options = {
          products,
          notLogged : req.flash('notLogged')
        }
        if(!req.session.device == "phone")options = {
          products,
          userName: req.session.firstName ? req.session.firstName : false,
        }
        return res.render(`${platform}/sub_category`, {...options, categories})
      });
    } catch (error) {
      console.log(error);
    }
  },
  Product: (req, res) => {
    req.session.previous_url = req.url;
    sql = `SELECT * FROM products WHERE name= "${req.params.product}"`;
    db(sql, (err, product) => {
      sql = `SELECT * FROM products WHERE sub_category ='${product[0].sub_category}'  ORDER BY product_id DESC LIMIT 3`;
      db(sql, (err, products)=>{
        if(req.session.device == "phone"){
          let notLogged = req.flash('notLogged');
          res.render("mobile/product", {product, categories, notLogged});
        }else{
            res.render("view/product", { 
              product,
              products,
              userName: req.session.lastName
            });
        }
      }) 
    });
  },
  Description: (req, res)=>{
    sql = `SELECT * FROM products WHERE name= "${req.params.product}"`;
    db(sql, null, (err, product)=>{
      if(err) console.log(err);
      return res.render('mobile/description', {product})
    })
  }
}