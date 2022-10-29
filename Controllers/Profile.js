const {db} = require('../models/sql/database');
const { categories } = require("../data.json");


exports.Profile = (req, res)=>{
    let sql = `SELECT * FROM customers WHERE user_id = ${req.session.passport.user}`;
    db(sql, null, (err, user)=>{
        if(req.session.device == "phone"){
            res.render('mobile/profile', {user, categories});
        }
    })
}