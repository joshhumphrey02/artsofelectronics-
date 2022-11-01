const { db } = require("../models/sql/database");
require('dotenv').config();
let sql;

module.exports = {
  Checkout: async (req, res) => {
    try {
      let firstName = req.session.firstName;
      let lastName = req.session.lastName;
      let platform = req.session.device == "phone" ? "mobile" : "view";
      sql = `SELECT products.product_id, products.name, products.image, products.price, cart.product_qty FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${req.session.passport.user} AND cart.checked = true`
      db(sql, null, async(err, result)=>{
        if(err) console.log(err.code);
          res.render(`${platform}/checkout`, { result, firstName, lastName, checkout: true});
      })
    } catch (err) {
      console.log(err);
    } 
  }
}