const { db } = require('./sql/database');
let sql;

module.exports={
    Authenticate: (req, res, next)=>{
        if (req.isAuthenticated()) {
            req.flash('notLogged', "false");
            return next();
        } else {
            req.flash('notLogged', "true");
            let url = req.session.previous_url ? req.session.previous_url : "/";
            res.redirect(`${url}`);
        }
    },
    logged: (req, res, next)=>{
        if (req.isAuthenticated() && !req.session.firstName) {
            sql = `SELECT * FROM customers WHERE user_id = ${req.session.passport.user}`;
            db(sql, null, (_, user)=>{
                req.session.firstName = user[0].first_name;
                req.session.lastName = user[0].last_name;
                req.session.email = user[0].email
            })
            return next();
        } else {
            return next();
        }
    },
    cartTransfer: (req, res, next)=>{
        let email = req.body.email;
        sql = `SELECT user_id FROM customers WHERE email = "${email}"`;
        db(sql, null, (err, user)=>{
            sql = `SELECT * FROM cart WHERE session_id = "${req.sessionID}"`;
            db(sql, null, (err, items)=>{
                items.map(item=>{
                    sql = `UPDATE cart SET user_id = ${user[0].user_id} WHERE cart_id = ${item.cart_id}`;
                    db(sql, null, (err)=>{
                        if(err) console.log(err);
                    })
                })
            })
        })
        return next();
    },
    login: (req, res, next)=>{
        let email = req.body.email;
        sql = `SELECT type FROM customers WHERE email = "${email}"`;
        db(sql, null, (err, user)=>{
            if(user[0].type === "admin") return res.redirect('/');
            else(next())
        })
    }
}