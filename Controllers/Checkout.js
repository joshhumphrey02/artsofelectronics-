const { db } = require("../models/sql/database");
let sql;

exports.Checkout = async (req, res) => {
  try {
    sql = `SELECT products.product_id, products.name, products.image, products.price, cart.product_qty FROM products JOIN cart ON products.product_id = cart.product_id WHERE cart.user_id = ${req.session.passport.user} AND cart.checked = true`
    db(sql, null, async(err, result)=>{
      if(err) throw err;
      sql = `SELECT * FROM customers WHERE user_id = ${req.session.passport.user}`
      await db(sql, (err, user)=> res.render("view/checkout", { result, user, checkout: true}));
    })
  } catch (err) {
    console.log(err);
  } 
}

exports.postAddress = async (req, res, next) => {
  try {
    const user_id = req.session.passport.user;
    const { phone, street, country, state, lga, apartment } = req.body;
    const data = { user_id, phone, street, country, state, lga, apartment};
    sql = `SELECT * FROM address WHERE user_id = ${user_id}`;
    db(sql, null, (err, result) => {
      if(err) throw new Error('An error occured' + err);
      if (result.length == 0) {
        sql = `INSERT INTO address SET?`;
        db(sql, data, (err) => {
          if (err) throw new Error('An error occured' + err);
          res.send({ added: "added" }).status(200);
        });
      } else {
        sql = `UPDATE address SET? WHERE user_id = ${user_id}`;
        db(sql, data, (err) => {
          if (err) throw new Error('An error occured');
          res.send({ added: "added" });
          res.status(200);
          return;
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    sql = "SELECT * FROM address WHERE user_id =?";
    const id = req.session.passport.user;
    db(sql, id, (err, result) => {
      if(err) throw new Error('An err occured')
      res.send(result).status(200);
    });
  } catch (err) {
    next(err)
  }
};
