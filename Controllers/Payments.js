require('dotenv').config();
var paystack = require("paystack-api")(process.env.PAYMENT_KEY);
const { db } = require("../models/sql/database");

class ids{
    constructor(dat){
        this.daz = dat
    }
    getIds () {
        let ids = []
        this.daz.forEach(pro=>{
            ids.push(pro.product_id);
        })
        return ids;
    }
}

const amount = (result)=>{
    let sum = result.reduce((sum, item)=> sum + (item.price * item.product_qty), 0);
    return ((sum)* 100);
}
const stack = async(req, res, reference, total, person)=>{
    try {
        let data = await paystack.transaction;
        let body = await data.initialize({
            reference: reference,
            amount: total,
            email: person
        });
        if(body.status){
            req.session.Ref = reference;
            sql = `DELETE FROM cart WHERE user_id=${req.session.passport.user} AND checked = true`;
            db(sql, null, (err)=>{
                res.send({url: body.data.authorization_url});
            })
        }
    } catch (err) {
        console.log('paystack err', err);
        res.redirect(`${req.session.previous_url}`)
    }
}


module.exports = {
    Comfirmation: async(req, res)=>{
        let data = await paystack.transaction;
        let info = await data.verify({reference: req.session.Ref});
        res.render('view/payment_status', {message: info.message})
    },
    Payment: (req, res)=>{
        try {
            let date = new Date(Date.now());
            let reference = Math.floor((Math.random())* 1000000000);
            const id = req.session.passport.user;
            let sql = `SELECT email FROM customers WHERE user_id = ${id}`;
            db(sql, (err, user)=>{
                sql = `SELECT products.price, cart.product_qty, cart.product_id FROM cart JOIN products ON cart.product_id = products.product_id  WHERE user_id = ${id} AND checked = true`;
                db(sql, (err, result)=>{
                    let total = amount(result);
                    sql = `INSERT INTO transactions SET?`;
                    let info = {
                        trans_id: reference,
                        user_id: id,
                        products: new ids(result).getIds().join(',').toString(),
                        email: user[0].email,
                        session: `${date.toDateString()} - ${date.toTimeString().slice(0, 15)}`,
                        amount: total
                    }
                    db(sql, info, (err)=>{
                        if(err) console.log('transaction not saved', err);
                        stack(req, res, reference, total, user[0].email);
                    })
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}