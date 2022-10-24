const localStrategy = require("passport-local").Strategy;
const { db } = require("./sql/database");

module.exports = (passport) => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      let sql = `SELECT * FROM customers WHERE email ="${email}"`;
      db(sql, (err, result) => {                                   
        if (result.length == 0) {
          return done(null, false, {
            message: "Email is not yet registered",
          });
        } else {
          return done(null, result, { id: result[0].user_id });
        }
      });
    })
  );
  passport.serializeUser((result, done) => {
    done(null, result[0].user_id);
  });
  passport.deserializeUser((id, done) => {
    let sql = `SELECT * FROM customers WHERE user_id =${id}`;
    db(sql, (err, result) => {
      done(err, result);
    });
  });
};
